const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantesRoutes');

const app = express();
const puerto = 3000;

// 1º MIDDLEWARES GLOBALES (Primero procesamos los datos que entran)
app.use(cors());
app.use(express.json()); 

// 2º RUTAS (Después mapeamos los endpoints)
app.use('/estudiantes', estudiantesRoutes);

app.listen(puerto, () => {
    console.log(`🚀 Servidor corriendo sin errores en http://localhost:${puerto}`);
});