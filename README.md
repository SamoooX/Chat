# Ferramas

## Descripción del Proyecto

Ferramas es una aplicación desarrollada para facilitar la gestión y organización de ferreterías. Este proyecto tiene como objetivo ofrecer una solución eficiente y moderna para el manejo de inventarios, ventas y atención al cliente.

## Requisitos del Sistema

Para poder ejecutar y desarrollar el proyecto Ferramas, asegúrate de tener instalado lo siguiente:

- Node.js (versión 20)
- npm (Node Package Manager)

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/SamoooX/Chat.git

2. **Navegar al directorio del proyecto**:
   ```bash
   cd Chat
   ```

3. **Instalar las dependencias**:
   ```bash
   npm install
   ```

## Iniciar el Proyecto

Para iniciar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Este comando iniciará la aplicación en modo de desarrollo. Por defecto, la aplicación estará disponible en `http://localhost:3005`.

## Estructura del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
- `server/`: Contiene el server del WebSocket.
- `package.json`: Archivo de configuración del proyecto y dependencias.
- `README.md`: Documento de referencia y guía de uso del proyecto.



# API Ferremas

Esta API proporciona funcionalidades para administrar productos de la tienda Ferremas.

### Tecnologías Utilizadas
- **Flask**: Framework de desarrollo web en Python utilizado para crear la API.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar datos de la aplicación.
- **ElephantSQL**: Servicio de base de datos en la nube PostgreSQL utilizado para alojar la base de datos de la aplicación.

### Base de datos
-La base de datos que se utilizada se encuentra en la carpeta API y BD y tiene por nombre "BD_ferremas.txt"

### Uso de la API
Para utilizar la API Ferremas, sigue estos pasos:

1. Descarga y descomprime el archivo `Ferremas.zip` que contiene el código fuente de la API.
2. Abre el proyecto en Replit y asegúrate de tener todas las dependencias instaladas.
3. Ejecuta la aplicación Flask y accede a los diferentes endpoints para realizar las operaciones deseadas.

### Endpoints Disponibles
- **GET /api/productos**: Obtener todos los productos.
- **POST /api/productos/add**: Agregar un nuevo producto.
- **PATCH /api/productos/update**: Actualizar un producto existente.
- **GET /api/productos/categoria/<id_categoria>**: Obtener productos por categoría.
- **GET /api/productos/historial_precios/<id_producto>**: Obtener historial de precios de un producto.
- **GET /api/productos/disponibilidad_sucursales/<id_producto>**: Verificar disponibilidad en sucursales.
- **GET /api/productos/promocion**: Obtener productos en promoción.
- **DELETE /api/productos/promocion/eliminar/<id_promocion>**: Eliminar una promocion por su ID.

### Ejemplo de Uso
Para obtener todos los productos, realiza una solicitud GET a la URL: `https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/`
