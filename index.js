const express = require('express');
const cors = require('cors'); // Importamos la librería para permitir conexiones del frontend
const pool = require('./db');
const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json()); 


// 1. BROWSE 
app.get('/estudiantes', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM estudiantes WHERE activo = 1 ORDER BY id_estudiante ASC');
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error en BROWSE:", error.message);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// 2. READ 
app.get('/estudiantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = $1 AND activo = 1', [id]);
    
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado o inactivo' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error en READ:", error.message);
    res.status(500).json({ error: 'Error al buscar el estudiante' });
  }
});

// 3. ADD 
app.post('/estudiantes', async (req, res) => {
  try {
    const { id_estudiante, documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = req.body;
    
    const consulta = `
      INSERT INTO estudiantes (id_estudiante, documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion) 
      VALUES ($1, $2, $3, $4, $5, $6, 1, $7, CURRENT_TIMESTAMP) RETURNING *
    `;
    const valores = [id_estudiante, documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion];
    
    const resultado = await pool.query(consulta, valores);
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error("Error en ADD:", error.message);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
});

// 4. EDIT 
app.put('/estudiantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = req.body;
    
    const consulta = `
      UPDATE estudiantes 
      SET documento = $1, apellido = $2, nombres = $3, email = $4, fecha_nacimiento = $5, 
          id_usuario_modificacion = $6, fecha_hora_modificacion = CURRENT_TIMESTAMP
      WHERE id_estudiante = $7 RETURNING *
    `;
    const valores = [documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion, id];
    
    const resultado = await pool.query(consulta, valores);
    
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado para editar' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Error en EDIT:", error.message);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
});

// 5. DELETE 
app.delete('/estudiantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const consulta = `
      UPDATE estudiantes 
      SET activo = 0, fecha_hora_modificacion = CURRENT_TIMESTAMP 
      WHERE id_estudiante = $1 RETURNING *
    `;
    
    const resultado = await pool.query(consulta, [id]);
    
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado para eliminar' });
    }
    res.json({ mensaje: 'Estudiante dado de baja correctamente', estudiante: resultado.rows[0] });
  } catch (error) {
    console.error("Error en DELETE:", error.message);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
});
// 6. RESTAURAR (Reactivar un estudiante dado de baja)
app.patch('/estudiantes/:id/activar', async (req, res) => {
  try {
    const { id } = req.params;
    
    const consulta = `
      UPDATE estudiantes 
      SET activo = 1, fecha_hora_modificacion = CURRENT_TIMESTAMP 
      WHERE id_estudiante = $1 RETURNING *
    `;
    
    const resultado = await pool.query(consulta, [id]);
    
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado en la base de datos' });
    }
    res.json({ mensaje: 'Estudiante reactivado correctamente', estudiante: resultado.rows[0] });
  } catch (error) {
    console.error("Error en RESTAURAR:", error.message);
    res.status(500).json({ error: 'Error al reactivar el estudiante' });
  }
});


app.listen(puerto, () => {
  console.log(`🚀 Backend BREAD funcionando al 100% en http://localhost:${puerto}`);
});