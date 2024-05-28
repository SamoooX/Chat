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



# API de Gestión de Productos

Esta API proporciona funcionalidades para la gestión de productos, incluyendo la consulta, adición, actualización y eliminación de productos, así como la gestión de promociones y el seguimiento del historial de precios.

## Enlaces útiles

- **Base URL**: [API de Gestión de Productos](https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/)

## Endpoints Disponibles

### Productos

- `GET /productos`: Obtiene todos los productos.
- `POST /productos/add`: Agrega un nuevo producto.
- `PATCH /productos/update`: Actualiza un producto existente.
- `DELETE /productos/delete/<id_producto>`: Elimina un producto por su ID.
- `GET /productos/categoria/<categoria>`: Obtiene productos por categoría.

### Historial de Precios

- `GET /historial_precios/<id_producto>`: Obtiene el historial de precios de un producto por su ID.

### Promociones de Productos

- `POST /promocion/agregar`: Agrega una nueva promoción de producto.
- `PATCH /promocion/actualizar`: Actualiza una promoción de producto existente.
- `DELETE /promocion/eliminar/<promocion_id>`: Elimina una promoción de producto por su ID.

### Otros Endpoints

- `GET /promocion`: Obtiene productos en promoción.
- `GET /lanzamientos`: Obtiene lanzamientos recientes.
- `GET /disponibilidad_sucursales/<id_producto>`: Verifica la disponibilidad en sucursales de un producto.

## Ejemplos de Uso

### Obtener todos los productos

```bash
GET https://43956d08-5a9f-4221-bbe5-a73230d59fc2-00-3en0whd6bspg9.spock.replit.dev/productos
