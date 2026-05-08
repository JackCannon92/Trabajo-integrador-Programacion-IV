const pool = require('./db'); 

// 1. BROWSE
const obtenerTodos = async () => {
  const resultado = await pool.query('SELECT * FROM estudiantes WHERE activo = 1 ORDER BY id_estudiante ASC');
  return resultado.rows;
};

// 2. READ
const obtenerPorId = async (id) => {
  const resultado = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = $1 AND activo = 1', [id]);
  return resultado.rows[0];
};

// 3. ADD
const crear = async (datos) => {
  const { id_estudiante, documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = datos;
  const consulta = `
    INSERT INTO estudiantes (id_estudiante, documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion) 
    VALUES ($1, $2, $3, $4, $5, $6, 1, $7, CURRENT_TIMESTAMP) RETURNING *
  `;
  const valores = [id_estudiante, documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// 4. EDIT
const actualizar = async (id, datos) => {
  const { documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = datos;
  const consulta = `
    UPDATE estudiantes 
    SET documento = $1, apellido = $2, nombres = $3, email = $4, fecha_nacimiento = $5, 
        id_usuario_modificacion = $6, fecha_hora_modificacion = CURRENT_TIMESTAMP
    WHERE id_estudiante = $7 RETURNING *
  `;
  const valores = [documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion, id];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

// 5. DELETE (Baja lógica)
const eliminar = async (id) => {
  const consulta = `
    UPDATE estudiantes 
    SET activo = 0, fecha_hora_modificacion = CURRENT_TIMESTAMP 
    WHERE id_estudiante = $1 RETURNING *
  `;
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
};

// 6. RESTAURAR
const restaurar = async (id) => {
  const consulta = `
    UPDATE estudiantes 
    SET activo = 1, fecha_hora_modificacion = CURRENT_TIMESTAMP 
    WHERE id_estudiante = $1 RETURNING *
  `;
  const resultado = await pool.query(consulta, [id]);
  return resultado.rows[0];
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restaurar
};