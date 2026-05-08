const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 3000;

// Middlewares globales (Seguridad y formato JSON)
app.use(cors());
app.use(express.json());

// 1. Importamos el "mapa" de rutas que acabamos de crear
const estudiantesRoutes = require('./routes/estudiantesRoutes');

// 2. Le decimos a Express: "Cualquier petición que empiece con '/estudiantes', 
// mándala a que la resuelva mi nuevo archivo de rutas"
app.use('/estudiantes', estudiantesRoutes);

// Iniciamos el servidor
app.listen(puerto, () => {
  console.log(` servidor prendido en http://localhost:${puerto}`);
});