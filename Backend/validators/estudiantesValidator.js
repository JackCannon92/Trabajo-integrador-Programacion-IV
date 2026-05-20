// Backend/validators/estudiantesValidator.js

/**
 * Middleware de validación de datos de estudiantes.
 * 
 * Su función es verificar que la información recibida
 * en el cuerpo de la petición HTTP sea válida antes
 * de continuar hacia el controlador y la lógica de negocio.
 * 
 * Si alguna validación falla:
 * - Se corta la ejecución.
 * - Se devuelve un error HTTP 400 (Bad Request).
 * 
 * Si todas las validaciones son correctas:
 * - Se ejecuta next() para continuar el flujo.
 */

const validarDatosEstudiante = (req, res, next) => {

    // Extraemos los datos enviados desde el frontend
  const { documento, apellido, nombres, email, fecha_nacimiento } = req.body;

  
  /**
   * 1- Validación de Documento.
   * Permite únicamente:
   * - Dígitos numéricos
   * - Entre 1 y 8 caracteres
   */
  const dniRegex = /^\d{1,8}$/;
  if (!documento || !dniRegex.test(documento.toString()) || Number(documento) < 1) {
  // Verificamos:
  // - Que exista el documento
  // - Que cumpla el formato regex
  // - Que sea mayor a 0
    return res.status(400).json({ error: 'El documento debe ser un número entero entre 1 y 99999999, sin puntos ni comas.' });
  }

  
   /**
   * 2- Validar Apellido y Nombres
   * Permite:
   * - Letras mayúsculas y minúsculas
   * - Letras con acentos
   * - Ñ y ñ
   * - Espacios
   */
  const letrasEspaciosRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;


// Sanitizamos antes de validar para evitar espacios al inicio/fin
req.body.apellido = apellido.trim();
req.body.nombres = nombres.trim();


// Reasignamos las variables locales para que las validaciones usen el valor limpio
const apellidoLimpio = req.body.apellido;
const nombresLimpio = req.body.nombres;


// Validación de apellido
if (!apellidoLimpio || !letrasEspaciosRegex.test(apellidoLimpio)) {
  return res.status(400).json({ error: 'El apellido es obligatorio y solo debe contener letras y espacios (ej: Ruiz Dias).' });
}


// Validación de nombres
if (!nombresLimpio || !letrasEspaciosRegex.test(nombresLimpio)) {
  return res.status(400).json({ error: 'Los nombres son obligatorios y solo deben contener letras y espacios (ej: Juan Manuel).' });
}
/**
   * Regex estándar para emails:
   * 
   * - Permite letras, números y caracteres especiales válidos (._+-).
   * - Requiere arroba (@).
   * - Requiere dominio.
   * - Requiere extensión entre 2 y 10 letras (acepta .com, .ar, .edu.ar, .org, etc.).
   * 
   * Ejemplos válidos:
   * usuario@gmail.com
   * juan.perez@uner.edu.ar
   */
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,10}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Debe ingresar un email válido (ej: usuario@dominio.com).' });
  }


  // Validación de fecha de nacimiento
  const fecha = new Date(fecha_nacimiento);


   // Validamos:
  // - Que exista una fecha
  // - Que la fecha sea válida
  if (!fecha_nacimiento || isNaN(fecha.getTime())) {
    return res.status(400).json({ error: 'La fecha de nacimiento es obligatoria y debe ser una fecha válida.' });
  }
 
  // Evitamos años irreales (anteriores a 1900)
  if (fecha.getFullYear() < 1900) {
    return res.status(400).json({ error: 'La fecha de nacimiento no es válida.' });
  }
 
  // La fecha no puede ser futura
  const hoy = new Date();
  if (fecha > hoy) {
    return res.status(400).json({ error: 'La fecha de nacimiento no puede ser futura.' });
  }
 
  // Calculamos la edad
  let edad = hoy.getFullYear() - fecha.getFullYear();


  // Verificamos si ya cumplió años este año
  const cumpleEsteAnio = hoy.getMonth() > fecha.getMonth() ||
    (
     hoy.getMonth() === fecha.getMonth() &&
     hoy.getDate() >= fecha.getDate()
    );

  // Si todavía no cumplió años, restamos 1
  if (!cumpleEsteAnio) edad--;
 

  // El estudiante debe ser mayor de edad
  if (edad < 18) {
    return res.status(400).json({ error: 'El estudiante debe ser mayor de 18 años.' });
  }
 

  // Si todas las validaciones son correctas,
  // se continúa hacia el controlador
  next();
};

module.exports = {
  validarDatosEstudiante
};