
# Mini Event Manager – Frontend

## Tecnologías

- Framework: Next.js 14 (App Router)
- Lenguaje: TypeScript
- HTTP Client: Fetch API
- Environment Variables: .env.local

## Requisitos previos

- Node >= 18
- NPM
- Backend en ejecucion

# Configuración inicial

## Variables de entorno

Crear los archivos
- .env.example
- .env 

Copiar en cada archivo:

```
El archivo .env debe contener:

NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Desde la carpeta frontend:

```
npm install
```

### Ejecutar la aplicación

```
npm run dev
```

### La aplicación estará disponible en:

http://localhost:3000


# Pantallas implementadas

- Login
- Registro
- Listado de eventos
- Detalle de evento
- Crear evento
- Editar evento
- Eliminar evento

## Notas importantes

El backend debe estar corriendo en el puerto 5000

Si el backend no responde, la app mostrará errores

## Detener frontend

Presiona:

```
CTRL + C
```
