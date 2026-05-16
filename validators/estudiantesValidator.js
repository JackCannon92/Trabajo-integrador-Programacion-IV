// Backend/validators/estudiantesValidator.js

const validarDatosEstudiante = (req, res, next) => {
  const { documento, apellido, nombres, email } = req.body;

  const dniRegex = /^\d{1,8}$/;
  if (!documento || !dniRegex.test(documento.toString()) || Number(documento) < 1) {
    return res.status(400).json({ error: 'El documento debe ser un número entero entre 1 y 99999999, sin puntos ni comas.' });
  }

  // 2. Validar Apellido y Nombres: Solo letras (incluyendo acentos/ñ) y espacios
  const letrasEspaciosRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (!apellido || apellido.trim() === '' || !letrasEspaciosRegex.test(apellido)) {
    return res.status(400).json({ error: 'El apellido es obligatorio y solo debe contener letras y espacios (ej: Ruiz Dias).' });
  }

  if (!nombres || nombres.trim() === '' || !letrasEspaciosRegex.test(nombres)) {
    return res.status(400).json({ error: 'Los nombres son obligatorios y solo deben contener letras y espacios (ej: Juan Manuel).' });
  }

  if (!email || !email.includes('@') || !email.endsWith('.com')) {
    return res.status(400).json({ error: 'Debe ingresar un email válido que termine estrictamente en .com' });
  }

  // Si pasa todas las pruebas, la petición sigue su viaje
  next();
};

module.exports = {
  validarDatosEstudiante
};