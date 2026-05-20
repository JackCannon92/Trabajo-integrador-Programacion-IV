/**
 * Este archivo contiene la lógica de negocio relacionada
 * con estudiantes.
 * 
 * La capa service funciona como intermediaria entre:
 * 
 * Controllers  →  Services  →  Repository
 * 
 * Responsabilidades:
 * - Aplicar reglas de negocio.
 * - Validar existencia de registros.
 * - Coordinar operaciones.
 * - Delegar acceso a datos al repository.
 */


// Importamos el repositorio encargado de interactuar
// con la base de datos
const estudiantesRepository = require('../repositories/estudiantesRepository');

/**
 *  1. BROWSE
 * Obtiene la lista completa de estudiantes.
 * 
 * @returns {Promise<Array>}
 * Lista de estudiantes.
 */
const obtenerTodos = async () => {
  return await estudiantesRepository.obtenerTodos();
};

/**
 * 2. READ
 * Obtiene un estudiante específico mediante su ID.
 * 
 * Antes de devolver el resultado se verifica
 * que el estudiante exista.
 * 
 * @param {number|string} id
 * ID del estudiante.
 * 
 * @returns {Promise<Object>}
 * Estudiante encontrado.
 * 
 * @throws {Error}
 * Si el estudiante no existe.
 */
const obtenerPorId = async (id) => {
  // Buscamos el estudiante en la base de datos
  const estudiante = await estudiantesRepository.obtenerPorId(id);
  // Validamos existencia
  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }
  return estudiante;
};

/**
 * 3. ADD
 * Crea un nuevo estudiante.
 * 
 * Recibe los datos desde el controlador y
 * los delega al repository para su inserción
 * en la base de datos.
 * 
 * @param {Object} datos
 * Datos del estudiante.
 * 
 * @returns {Promise<Object>}
 * Estudiante creado.
 */
const crear = async (datos) => {
  // Pasamos directamente los datos al repository
  return await estudiantesRepository.crear(datos);
};


/**
 * 4. EDIT
 * Actualiza los datos de un estudiante existente.
 * 
 * Antes de actualizar:
 * - Se verifica que el estudiante exista.
 * 
 * @param {number|string} id
 * ID del estudiante.
 * 
 * @param {Object} datos
 * Nuevos datos del estudiante.
 * 
 * @returns {Promise<Object>}
 * Estudiante actualizado.
 * 
 * @throws {Error}
 * Si el estudiante no existe.
 */
const actualizar = async (id, datos) => {
  // Verificamos existencia previa
  const estudiante = await estudiantesRepository.obtenerPorId(id);


  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }


  // Delegamos actualización al repository
  return await estudiantesRepository.actualizar(id, datos);
};


/**
 * 5. DELETE
 * Realiza la baja lógica de un estudiante.
 * 
 * Antes de eliminar:
 * - Se verifica que el estudiante exista.
 * 
 * @param {number|string} id
 * ID del estudiante.
 * 
 * @returns {Promise<Object>}
 * Estudiante dado de baja.
 * 
 * @throws {Error}
 * Si el estudiante no existe.
 */
const eliminar = async (id) => {

  // Verificamos existencia
  const estudiante = await estudiantesRepository.obtenerPorId(id);
  if (!estudiante) {
    throw new Error('Estudiante no encontrado');
  }

  // Delegamos eliminación al repository
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


// Exportamos los servicios para utilizarlos
// desde los controladores
module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restaurar
};