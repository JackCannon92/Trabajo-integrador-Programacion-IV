const estudiantesRepository = require('../repositories/estudiantesRepository');

// 1. BROWSE
const obtenerTodos = async () => {
  return await estudiantesRepository.obtenerTodos();
};

// 2. READ
const obtenerPorId = async (id) => {
  const estudiante = await estudiantesRepository.obtenerPorId(id);
  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }
  return estudiante;
};

// 3. ADD
const crear = async (datos) => {
  // Pasamos la caja entera directamente al repositorio
  return await estudiantesRepository.crear(datos);
};

// 4. EDIT
const actualizar = async (id, datos) => {
  const estudiante = await estudiantesRepository.obtenerPorId(id);
  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }
  return await estudiantesRepository.actualizar(id, datos);
};

// 5. DELETE
const eliminar = async (id) => {
  const estudiante = await estudiantesRepository.obtenerPorId(id);
  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }
  return await estudiantesRepository.eliminar(id);
};

/**
 * Reactiva un estudiante previamente dado de baja (activo = 1).
 * La verificación de existencia la delega al repositorio: si el UPDATE
 * no encuentra el ID, devuelve undefined y el controlador responde 404.
 *
 * @param {number|string} id - ID del estudiante a reactivar.
 * @returns {Promise<Object|undefined>} El estudiante con `activo = 1`, o undefined si no existe.
 */
const restaurar = async (id) => {
  return await estudiantesRepository.restaurar(id);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restaurar
};