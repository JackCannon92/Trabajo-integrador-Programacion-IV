/**
 * Este archivo contiene funciones encargadas de transformar
 * y adaptar los datos obtenidos desde la base de datos
 * antes de enviarlos al cliente.
 * 
 * Objetivos:
 * - Formatear datos.
 * - Renombrar atributos.
 * - Mejorar legibilidad.
 * - Adaptar la respuesta de la API.
 */


/**
 * Transforma un único estudiante proveniente de la base
 * de datos en un objeto más amigable para el frontend.
 * 
 * @param {Object} estudiante
 * Objeto recibido desde la base de datos.
 * 
 * @returns {Object}
 * Objeto transformado listo para enviar al cliente.
 */
const transformarEstudiante = (estudiante) => {

  return {
    id: estudiante.id_estudiante,
    documento: estudiante.documento,
    apellido: estudiante.apellido,
    nombres: estudiante.nombres,
    email: estudiante.email,

    /**
     * Convertimos la fecha a formato argentino:
     * DD/MM/YYYY
     * 
     * Ejemplo:
     * 2026-05-12T00:00:00.000Z
     * ↓
     * 12/05/2026
     * 
     * Si la fecha no existe, devolvemos null.
     */
    fecha_nacimiento: estudiante.fecha_nacimiento 
      ? new Date(estudiante.fecha_nacimiento).toLocaleDateString('es-AR') 
      : null,

     /**
     * Convertimos el valor numérico de la base de datos
     * en un texto más legible para el frontend.
     * 
     * 1 → Activo
     * 0 → Inactivo
     */
    estado: estudiante.activo === 1 ? 'Activo' : 'Inactivo'
  };
};


/**
 * 
 * Transforma una lista completa de estudiantes.
 * 
 * Utiliza el método map() para recorrer el arreglo
 * y aplicar transformarEstudiante() a cada elemento.
 * 
 * @param {Array} estudiantes
 * Lista de estudiantes obtenida desde la base de datos.
 * 
 * @returns {Array}
 * Lista de estudiantes transformados.
 */
const transformarListaEstudiantes = (estudiantes) => {
  return estudiantes.map(transformarEstudiante);
};


// Exportamos los transformadores para poder utilizarlos
// en otras capas del sistema (services/controllers)
module.exports = {
  transformarEstudiante,
  transformarListaEstudiantes
};