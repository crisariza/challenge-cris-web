# Challenge Paisanos Web

Aplicación web frontend desarrollada con Next.js para el challenge de PaisaBank.

## Requisitos Previos

- **Node.js**: Versión 24.x
- **npm**: Versión 11.x
- **Back-end**: Asegurarse que este funcionando y con datos

1. Instalar las dependencias:

```bash
npm install
```

## Configuración

### Variables de entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Esta realizado con next_public para simplificar los archivos client, en produccion se pueden utilizar server-side varibles mediante un proxy para que el cliente las pueda utilizar y evitar exponer datos sensibles.

## Ejecutar la Web

### Dev

```bash
npm run dev
```

### Prod

1. Compilar

```bash
npm run build
```

2. Correr el server

```bash
npm start
```

3. Información útil

### Scripts

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`
- `npm run lint:fix`
- `npm run format`
- `npm run format:check`
- `npm run type-check`

## Estructura del Proyecto

```
challenge-paisanos-web/
├── src/
│   ├── app/              # Páginas y rutas de Next.js
│   ├── components/       # Componentes reutilizables
│   └── lib/              # Utilidades y configuraciones
├── public/               # Archivos estáticos (assets principalmente)
└── package.json
```

## Autenticación

- La app usa tokens de autenticación guardados en el navegador.
- Los tokens se envían automáticamente en las API requests mediante el header `Authorization: Bearer <token>`.

## Rutas

- `/` - Página de inicio (redirige a login si no hay sesión)
- `/login` - Página de login
- `/home` - Dashboard principal
- `/movements` - Lista de movimientos
- `/~` - Cualquier pagina no disponible muestra un custom 404

## Notas Adicionales

- El proyecto utiliza ESLint y Prettier para mantener la calidad del código, algunos errores de ESLint no llegue a corregirlos por el tiempo del proyecto y ser un challenge, en produccion lo ideal es no tener ninguno.
- Los sonidos y microinteracciones son más de lo que habria en un proyecto profesional, principalmente el objetivo fue mostrar su implementación.
