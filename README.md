# FullStackReactNode

Este proyecto utiliza un monorepo para gestionar tanto el backend como el frontend. A continuación, se describen los pasos necesarios para instalar dependencias, ejecutar los servicios y realizar migraciones con Prisma.

## Estructura del Proyecto

- `backend/` - Código y lógica del servidor.
- `frontend/` - Código y lógica del cliente.

## Instalación y Ejecución

### 1. Instalación de Dependencias

Abre dos terminales para trabajar con el proyecto:

**Terminal 1: Backend**

1. Navega a la carpeta del backend:
    ```bash
    cd backend
    ```
2. Instala las dependencias del backend:
    ```bash
    npm install
    ```

**Terminal 2: Frontend**

1. Navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2. Instala las dependencias del frontend:
    ```bash
    npm install
    ```

### 2. Ejecución del Backend

**Terminal 1: Backend**

1. Asegúrate de estar en la carpeta `backend`:
    ```bash
    cd backend
    ```
2. Ejecuta el backend en modo de observación (watch mode):
    ```bash
    node --watch src/server.mjs
    ```

### 3. Ejecución del Frontend

**Terminal 2: Frontend**

1. Asegúrate de estar en la carpeta `frontend`:
    ```bash
    cd frontend
    ```
2. Ejecuta el frontend en modo de desarrollo:
    ```bash
    npm run dev
    ```

### 4. Migraciones con Prisma

Para crear nuevas tablas o realizar migraciones en la base de datos utilizando Prisma, sigue estos pasos:

1. Asegúrate de estar en la carpeta del backend:
    ```bash
    cd backend
    ```
2. Ejecuta el siguiente comando para crear una nueva migración:
    ```bash
    npx prisma migrate dev --name PrimerMigration init
    ```

## Contribución

Para contribuir a este proyecto, sigue los pasos estándar de Git para hacer un fork, crear una rama, hacer cambios y enviar un pull request.

