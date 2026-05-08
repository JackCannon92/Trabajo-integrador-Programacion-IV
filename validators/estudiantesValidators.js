const validarDatosEstudiante = (req, res, next) => {
  const { documento, apellido, nombres, email } = req.body;

  if (!documento || documento.toString().trim() === '') {
    return res.status(400).json({ error: 'El documento es obligatorio' });
  }

  if (!apellido || apellido.trim() === '') {
    return res.status(400).json({ error: 'El apellido es obligatorio' });
  }
  if (!nombres || nombres.trim() === '') {
    return res.status(400).json({ error: 'Los nombres son obligatorios' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Debe ingresar un email válido' });
  }

  next();
};

module.exports = {
  validarDatosEstudiante
};