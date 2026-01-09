
# Mini Event Manager
## Backend

### Tecnologías

- Node.js 20.19.1 +
- NestJS
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- JWT Authentication

### Requisitos previos

- Docker
- Docker Compose
- Node.js 20.19.1 +

## Configuración inicial

### 1 Variables de entorno

Crear los archivos
- .env.example
- .env 

Copiar en cada archivo:

```
El archivo .env debe contener:

DATABASE_URL=postgresql://postgres:postgres@db:5432/eventsdb
JWT_SECRET=supersecretjwt
PORT=5000
```

### 2 Levantar el backend con Docker

Desde la carpeta backend:

```
docker-compose up --build
```


Esto levantará:

API NestJS → http://localhost:5000

PostgreSQL → puerto interno 5432


### 3 Ejecutar migraciones de Prisma (OBLIGATORIO)

NOTA: Este paso es obligatorio antes de usar la API.

Ver contenedores activos

```
docker ps
```


Busca el contenedor del backend (en mi caso fue):

```
backend-api-1
```

Entrar al contenedor del backend

```
docker exec -it backend-api-1 sh
```


(Ajusta el nombre segun el nombre del contenedor que salio en docker ps)

Ejecutar migraciones

Dentro del contenedor:

```
npx prisma migrate dev --name init
```


Salida esperada:
```
- Applied migration init
- Generated Prisma Client
```

Salir del contenedor

```
exit
```


### Endpoints principales

#### Auth
- POST /api/register
- POST /auth/login

#### Events
- POST /events
- GET /events
- GET /events/:id
- PUT /events/:id
- DELETE /events/:id

### Notas importantes

```
El host db en DATABASE_URL solo funciona dentro de Docker

Las migraciones deben ejecutarse dentro del contenedor
```

#### Detener el proyecto

```
docker-compose down
```


## Frontend

### Tecnologías

- Framework: Next.js 14 (App Router)
- Lenguaje: TypeScript
- HTTP Client: Fetch API
- Environment Variables: .env.local

### Requisitos previos

- Node >= 18
- NPM
- Backend en ejecucion

## Configuración inicial

### Variables de entorno

Crear los archivos
- .env.example
- .env 

Copiar en cada archivo:

```
El archivo .env debe contener:

NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Desde la carpeta frontend:

```
npm install
```

#### Ejecutar la aplicación

```
npm run dev
```

#### La aplicación estará disponible en:

http://localhost:3000


## Pantallas implementadas

- Login
- Registro
- Listado de eventos
- Detalle de evento
- Crear evento
- Editar evento
- Eliminar evento

### Notas importantes

El backend debe estar corriendo en el puerto 5000

Si el backend no responde, la app mostrará errores

### Detener frontend

Presiona:

```
CTRL + C
```
