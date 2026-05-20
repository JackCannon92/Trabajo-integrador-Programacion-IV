const pool = require('./db');

/**
 * BROWSE: Obtiene la lista de estudiantes activos con soporte para 
 * búsqueda global y paginación.
 */
const obtenerTodos = async ({ busqueda = '', pagina = 1, limite = 10, inactivos = false }) => {
  const offset = (pagina - 1) * limite;
  const filtro = `%${busqueda}%`;
  
  // ¡LA MAGIA! Si inactivos es true, buscamos 0 (baja). Si es false, buscamos 1 (activos).
  const estadoFiltro = inactivos ? 0 : 1; 

  const consultaDatos = `
    SELECT * FROM estudiantes
    WHERE activo = $4
      AND (apellido ILIKE $1 OR nombres ILIKE $1 OR documento ILIKE $1 OR email ILIKE $1)
    ORDER BY apellido ASC
    LIMIT $2 OFFSET $3
  `;

  const consultaTotal = `
    SELECT COUNT(*) FROM estudiantes
    WHERE activo = $2
      AND (apellido ILIKE $1 OR nombres ILIKE $1 OR documento ILIKE $1 OR email ILIKE $1)
  `;

  const resultado = await pool.query(consultaDatos, [filtro, limite, offset, estadoFiltro]);
  const totalRes = await pool.query(consultaTotal, [filtro, estadoFiltro]);
  
  const totalRegistros = parseInt(totalRes.rows[0].count);

  return {
    datos: resultado.rows,
    total: totalRegistros,
    pagina,
    limite,
    totalPaginas: Math.ceil(totalRegistros / limite)
  };
};

/**
 * READ: Obtiene un único estudiante por su ID, siempre que esté activo.
 */
const obtenerPorId = async (id) => {
    // ¡BORRÁ EL "AND activo = 1"!
    // Queremos que busque al alumno por ID aunque esté inactivo.
    const consulta = `SELECT * FROM estudiantes WHERE id_estudiante = $1`;
    const resultado = await pool.query(consulta, [id]);
    return resultado.rows[0];
};

/**
 * ADD: Crea un nuevo registro. 
 * Nota: Todos los campos son NOT NULL en la DB, por lo que llegan validados.
 */
const crear = async ({ documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion }) => {
  const consulta = `
    INSERT INTO estudiantes (documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion)
    VALUES ($1, $2, $3, $4, $5, 1, $6, NOW())
    RETURNING *;
  `;
  // El id_usuario_modificacion va en la posición del $6
  const resultado = await pool.query(consulta, [documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion]);
  return resultado.rows[0];
};
/**
 * EDIT: Actualiza los datos de un estudiante activo.
 */
const actualizar = async (id, datos) => {
  const { documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = datos;
  
  const consulta = `
    UPDATE estudiantes
    SET documento = $1, apellido = $2, nombres = $3, email = $4, 
        fecha_nacimiento = $5, id_usuario_modificacion = $6, 
        fecha_hora_modificacion = CURRENT_TIMESTAMP
    WHERE id_estudiante = $7 AND activo = 1
    RETURNING *
  `;
  
  const valores = [documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion, id];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

/**
 * DELETE: Realiza la baja lógica del estudiante (Soft Delete).
 */
const eliminar = async (id, id_usuario_modificacion) => {
  const consulta = `
    UPDATE estudiantes 
    SET activo = 0, id_usuario_modificacion = $2, fecha_hora_modificacion = NOW() 
    WHERE id_estudiante = $1 
    RETURNING *;
  `;
  // $1 es el id del estudiante, $2 es el id del usuario que modifica (el 1 del parche)
  const resultado = await pool.query(consulta, [id, id_usuario_modificacion]);
  return resultado.rows[0];
};

/**
 * RESTAURAR: Permite reactivar un estudiante que fue dado de baja.
 */
const restaurar = async (id, id_usuario_modificacion) => {
  const consulta = `
    UPDATE estudiantes 
    SET activo = 1, id_usuario_modificacion = $2, fecha_hora_modificacion = NOW() 
    WHERE id_estudiante = $1 
    RETURNING *;
  `;
  // $1 es el id del estudiante, $2 es el id_usuario_modificacion (el 1 del parche)
  const resultado = await pool.query(consulta, [id, id_usuario_modificacion]);
  return resultado.rows[0];
};

const buscarPorDocumento = async (documento) => {
  const resultado = await pool.query(
    'SELECT id_estudiante FROM estudiantes WHERE documento = $1',
    [documento]
  );
  return resultado.rows[0];
};
module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restaurar,
  buscarPorDocumento
};