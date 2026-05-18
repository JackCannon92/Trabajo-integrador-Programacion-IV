const pool = require('./db'); // Conexión a la base de datos dentro de la carpeta repositories

// 1. BROWSE - Obtener todos los estudiantes activos
async function obtenerTodos() {
    const consulta = 'SELECT * FROM estudiantes WHERE activo = 1 ORDER BY id_estudiante ASC';
    const resultado = await pool.query(consulta);
    return resultado.rows;
}

// 2. READ - Obtener un estudiante específico por ID (solo si está activo)
async function obtenerPorId(id) {
    const consulta = 'SELECT * FROM estudiantes WHERE id_estudiante = $1 AND activo = 1';
    const resultado = await pool.query(consulta, [id]);
    return resultado.rows[0];
}

// 3. ADD - Crear un nuevo estudiante (PostgreSQL genera el id_estudiante automáticamente)
async function crear(datos) {
    const { documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = datos;
    
    // Quitamos 'id_estudiante' de las columnas y de las variables ($1)
    // El campo 'activo' se inserta por defecto en 1 y usamos CURRENT_TIMESTAMP para la fecha de modificación
    const consulta = `
        INSERT INTO estudiantes (documento, apellido, nombres, email, fecha_nacimiento, activo, id_usuario_modificacion, fecha_hora_modificacion)
        VALUES ($1, $2, $3, $4, $5, 1, $6, CURRENT_TIMESTAMP)
        RETURNING *
    `;
    
    const valores = [documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion];
    const resultado = await pool.query(consulta, valores);
    return resultado.rows[0];
}

// 4. EDIT - Actualizar los datos de un estudiante existente
async function actualizar(id, datos) {
    const { documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = datos;
    
    const consulta = `
        UPDATE estudiantes 
        SET documento = $1, apellido = $2, nombres = $3, email = $4, fecha_nacimiento = $5, id_usuario_modificacion = $6, fecha_hora_modificacion = CURRENT_TIMESTAMP
        WHERE id_estudiante = $7 AND activo = 1
        RETURNING *
    `;
    
    const valores = [documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion, id];
    const resultado = await pool.query(consulta, valores);
    return resultado.rows[0];
}

// 5. DELETE - Borrado lógico (pasa el estado activo a 0)
async function eliminar(id, id_usuario_modificacion) {
    const consulta = `
        UPDATE estudiantes 
        SET activo = 0, id_usuario_modificacion = $1, fecha_hora_modificacion = CURRENT_TIMESTAMP
        WHERE id_estudiante = $2 AND activo = 1
        RETURNING *
    `;
    
    const resultado = await pool.query(consulta, [id_usuario_modificacion, id]);
    return resultado.rows[0];
}

// EXTRA/BONUS: Restaurar un estudiante (vuelve el estado activo a 1)
async function restaurar(id, id_usuario_modificacion) {
    const consulta = `
        UPDATE estudiantes 
        SET activo = 1, id_usuario_modificacion = $1, fecha_hora_modificacion = CURRENT_TIMESTAMP
        WHERE id_estudiante = $2 AND activo = 0
        RETURNING *
    `;
    
    const resultado = await pool.query(consulta, [id_usuario_modificacion, id]);
    return resultado.rows[0];
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    restaurar
};