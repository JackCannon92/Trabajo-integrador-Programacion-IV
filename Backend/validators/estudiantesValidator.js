function validarAlta(req, res, next) {
    // Si req.body no está procesado por Express, evitamos el crash
    if (!req.body) {
        return res.status(400).json({ error: 'No se recibieron datos en el body.' });
    }

    const { documento, apellido, nombres, email, fecha_nacimiento, id_usuario_modificacion } = req.body;

    // Tus expresiones regulares
    const dniRegex = /^\d{1,8}$/;
    const textoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!documento || !dniRegex.test(documento) || parseInt(documento) <= 0) {
        return res.status(400).json({ error: 'El DNI debe ser un número entero válido de hasta 8 dígitos sin puntos ni comas.' });
    }

    if (!apellido || !textoRegex.test(apellido) || !nombres || !textoRegex.test(nombres)) {
        return res.status(400).json({ error: 'El apellido y nombre solo pueden contener letras y espacios.' });
    }

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'El email no es válido.' });
    }

    if (!fecha_nacimiento || !id_usuario_modificacion) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    next();
}

module.exports = {
    validarAlta
};