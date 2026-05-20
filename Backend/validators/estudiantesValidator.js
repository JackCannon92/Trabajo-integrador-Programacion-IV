// Backend/validators/estudiantesValidator.js

const validarDatosEstudiante = (req, res, next) => {

  const { documento, apellido, nombres, email, fecha_nacimiento } = req.body;

  const dniRegex = /^\d{1,8}$/;
  if (!documento || !dniRegex.test(documento.toString()) || Number(documento) < 1) {
    return res.status(400).json({ error: 'El documento debe ser un número entero entre 1 y 99999999, sin puntos ni comas.' });
  }

  // 2. Validar Apellido y Nombres: Solo letras (incluyendo acentos/ñ) y espacios
  const letrasEspaciosRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

// Sanitizamos antes de validar para evitar espacios al inicio/fin
req.body.apellido = apellido.trim();
req.body.nombres = nombres.trim();

// Reasignamos las variables locales para que las validaciones usen el valor limpio
const apellidoLimpio = req.body.apellido;
const nombresLimpio = req.body.nombres;
  
if (!apellidoLimpio || !letrasEspaciosRegex.test(apellidoLimpio)) {
  return res.status(400).json({ error: 'El apellido es obligatorio y solo debe contener letras y espacios (ej: Ruiz Dias).' });
}

if (!nombresLimpio || !letrasEspaciosRegex.test(nombresLimpio)) {
  return res.status(400).json({ error: 'Los nombres son obligatorios y solo deben contener letras y espacios (ej: Juan Manuel).' });
}

   // Regex estándar para validación de email:
  // - Parte local: letras, números y caracteres especiales permitidos (._+-).
  // - Arroba obligatoria.
  // - Dominio: letras y números, opcionalmente separados por puntos.
  // - Extensión: entre 2 y 10 letras (acepta .com, .ar, .edu.ar, .org, etc.).
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,10}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Debe ingresar un email válido (ej: usuario@dominio.com).' });
  }




  // Validación de fecha de nacimiento
  const fecha = new Date(fecha_nacimiento);
  if (!fecha_nacimiento || isNaN(fecha.getTime())) {
    return res.status(400).json({ error: 'La fecha de nacimiento es obligatoria y debe ser una fecha válida.' });
  }
 
  // Descartamos años absurdos (anteriores a 1900)
  if (fecha.getFullYear() < 1900) {
    return res.status(400).json({ error: 'La fecha de nacimiento no es válida.' });
  }
 
  // La fecha no puede ser futura
  const hoy = new Date();
  if (fecha > hoy) {
    return res.status(400).json({ error: 'La fecha de nacimiento no puede ser futura.' });
  }
 
  // Calculamos la edad teniendo en cuenta si ya cumplió años este año
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const cumpleEsteAnio = hoy.getMonth() > fecha.getMonth() ||
    (hoy.getMonth() === fecha.getMonth() && hoy.getDate() >= fecha.getDate());
  if (!cumpleEsteAnio) edad--;
 
  if (edad < 18) {
    return res.status(400).json({ error: 'El estudiante debe ser mayor de 18 años.' });
  }
 

  
  next();
};

module.exports = {
  validarDatosEstudiante
};