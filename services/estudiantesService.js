const estudiantesRepository = require('../repositories/estudiantesRepository');

// 1. BROWSE
const obtenerTodos = async () => {
  return await estudiantesRepository.obtenerTodos();
};

// 2. READ
const obtenerPorId = async (id) => {
  return await estudiantesRepository.obtenerPorId(id);
};

// 3. ADD
const crear = async (datos) => {
  return await estudiantesRepository.crear(datos);
};

// 4. EDIT
const actualizar = async (id, datos) => {
  return await estudiantesRepository.actualizar(id, datos);
};

// 5. DELETE
const eliminar = async (id) => {
  return await estudiantesRepository.eliminar(id);
};

// 6. RESTAURAR
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