# Sistema de Inscripción a Cursos

Trabajo Final Integrador de **Programación IV** — Licenciatura en Sistemas (FCAD, UNER).

Es una aplicación web para administrar la inscripción de estudiantes a cursos. Tiene login con usuario y contraseña, ABM de estudiantes y de cursos, manejo de inscripciones con control de cupo, y generación de diplomas en PDF.

## Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **Frontend:** HTML, JavaScript (vanilla) y Bootstrap
- **Autenticación:** JWT (token)

El proyecto está separado en dos partes: el **backend**, que es la API, y el **frontend**, que son las páginas que consumen esa API. Las dos corren por separado.

## Qué hace falta tener instalado

- Node.js (v18 o más nuevo)
- PostgreSQL
- Un editor con la extensión Live Server para levantar el frontend (nosotros usamos VS Code)

## Cómo ponerlo a andar

### 1. La base de datos

Creá una base en PostgreSQL (nosotros la llamamos `fcad_cursos`) con las tablas del sistema:
`usuarios`, `estudiantes`, `cursos`, `cursos_estados`, `inscripciones` e `inscripciones_estados`.
Si tenés el dump `.sql`, importalo directo y listo.

### 2. El backend

Entrá a la carpeta `Backend` e instalá las dependencias:

```bash
cd Backend
npm install
```

Después armá el archivo `.env` (podés copiar el `.env.example` que está ahí) y completá tus datos:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=fcad_cursos
DB_PASSWORD=tu_contraseña
DB_PORT=5432

PORT=3000
JWT_SECRET=una_clave_secreta
```

Y arrancá el servidor:

```bash
npm start
```

Si salió todo bien, en la consola debería aparecer algo como:
`🚀 Servidor corriendo en http://localhost:3000`

### 3. El frontend

Abrí la carpeta `Frontend` y levantá `login.html` con Live Server.
Ojo: el frontend le pega al backend en `http://localhost:3000`, así que el backend tiene que estar corriendo primero.

## Cómo entrar al sistema

Para loguearte necesitás un usuario cargado en la tabla `usuarios`. El login está hecho para aceptar contraseñas en bcrypt, SHA-256 o texto plano, así no renegábamos con los usuarios de prueba mientras desarrollábamos.

Una vez que entrás, lo primero que ves es la pantalla de **Inicio**, con el resumen de estudiantes y cursos activos. Desde ahí navegás al resto de las secciones.

## Estructura del proyecto

```
Backend/
  config/         conexión a la base
  middlewares/    validación del token (JWT)
  routes/         rutas de la API
  controllers/    reciben las peticiones
  validators/     validaciones de los datos
  services/       reglas de negocio
  repositories/   consultas a la base (SQL)
  Transforms/     dan formato a las respuestas
  utils/          armado del diploma en PDF
  index.js        arranque del servidor

Frontend/
  *.html          páginas (login, inicio, estudiantes, cursos, inscripciones)
  js/             lógica de cada pantalla
  css/            estilos
```

## Algunas decisiones que tomamos

- Las bajas son **lógicas**, no se borra nada físicamente. Un estudiante o curso dado de baja se puede volver a activar, y no se pierde el histórico.
- Las reglas importantes de las inscripciones (que no se pase del cupo, que no haya duplicados y que el curso esté con la inscripción abierta) se validan en el **backend**, no solo en el navegador.
- Toda la API, menos el login, está protegida con token.

## Integrantes

- *(completar)*
- *(completar)*

---

Programación IV — 2026
