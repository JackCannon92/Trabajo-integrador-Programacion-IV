const estudiantesRepository = require('../repositories/estudiantesRepository');

// 1. BROWSE
const obtenerTodos = async (filtros) => {
    return await estudiantesRepository.obtenerTodos(filtros); 
};

// 2. READ
const obtenerPorId = async (id) => {
  return await estudiantesRepository.obtenerPorId(id);
};

// 3. ADD
const crear = async (datosEstudiante) => {
    return await estudiantesRepository.crear(datosEstudiante);
};

// 4. EDIT
const actualizar = async (id, datos) => {
  return await estudiantesRepository.actualizar(id, datos);
};

// 5. DELETE
const eliminar = async (id, id_usuario_modificacion) => {
    // ¡Asegurate de que pase los DOS parámetros al repositorio!
    return await estudiantesRepository.eliminar(id, id_usuario_modificacion);
};

// 6. RESTAURAR
const restaurar = async (id, id_usuario_modificacion) => {
    // Recibe ambos parámetros y los envía al repositorio
    return await estudiantesRepository.restaurar(id, id_usuario_modificacion);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restaurar
};