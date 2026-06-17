// ============================================================
//  Servidor Express — punto de entrada de la API REST
// ============================================================

// Variables de entorno (.env) — debe ir primero
import 'dotenv/config';

// 2. Después importamos el resto de las librerías y rutas
import express from 'express';
import cors from 'cors';
import estudiantesRoutes from './routes/estudiantesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cursosRoutes from './routes/cursosRoutes.js';
import inscripcionesRoutes from './routes/inscripcionesRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';   // arriba con los imports


const app = express();
const puerto = process.env.PORT || 3000;

// Middlewares globales
app.use(cors()); // permite el acceso desde el frontend
app.use(express.json()); // interpreta el body en JSON

// Registro de Rutas
app.use('/auth', authRoutes);
app.use('/estudiantes', estudiantesRoutes);
app.use('/cursos', cursosRoutes);
app.use('/inscripciones', inscripcionesRoutes);
app.use('/dashboard', dashboardRoutes); 

// Manejo de 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
