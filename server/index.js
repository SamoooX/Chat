import express from 'express';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import dontenv from 'dotenv';
import { createClient } from '@libsql/client';

dontenv.config();
const port = process.env.PORT ?? 3005;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: true
});

const db = createClient({
    url: "libsql://chat-integra-samuel.turso.io",
    authToken: process.env.DB_TOKEN,
});

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT
)`);

io.on('connection', async (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', async (msg) => {
        let result
        const username = socket.handshake.auth.username ?? 'Anonymous';
        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
                args: { msg, username}
            });
        } catch (e) {
            console.error(e);
            return
        }
        io.emit('chat message', msg, result.lastInsertRowid.toString(), username);
    });

    if (!socket.recovered){
        try {
            const results = await db.execute({
                sql:'SELECT id, content, user FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0]
            });
            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user);
            });

        }catch(e){
            console.error(e);
            return;
        }
    }
});
app.use(express.static('src/client'));
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/src/client/index.html');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});