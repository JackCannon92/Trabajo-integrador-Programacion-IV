const service = require('../services/estudiantesService');

const obtenerTodos = async (req, res) => {
  try {
    // Acá atrapamos la palabra "inactivos" que nos manda el frontend
    const { busqueda = '', pagina = 1, limite = 10, inactivos = 'false' } = req.query; 
    const resultado = await service.obtenerTodos({
      busqueda,
      pagina: parseInt(pagina),
      limite: parseInt(limite),
      inactivos: inactivos === 'true' // Lo pasamos a booleano
    });
    res.json(resultado);
  } catch (error) {
    console.error('Error en BROWSE:', error.message);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const estudiante = await service.obtenerPorId(req.params.id);
    if (!estudiante)
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(estudiante);
  } catch (error) {
    console.error('Error en READ:', error.message);
    res.status(500).json({ error: 'Error al buscar el estudiante' });
  }
};

const crear = async (req, res) => {
  try {
    const nuevo = await service.crear({
      ...req.body,
      id_usuario_modificacion: req.usuario.id_usuario
    });
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error en ADD:', error.message);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};

const actualizar = async (req, res) => {
  try {
    const actualizado = await service.actualizar(req.params.id, {
      ...req.body,
      id_usuario_modificacion: req.usuario.id_usuario
    });
    if (!actualizado)
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(actualizado);
  } catch (error) {
    console.error('Error en EDIT:', error.message);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

const eliminar = async (req, res) => {
  try {
  
    const id_usuario_modificacion = req.usuario.id_usuario;

    const eliminado = await service.eliminar(req.params.id, id_usuario_modificacion);
    
    if (!eliminado)
      return res.status(404).json({ error: 'Estudiante no encontrado' });
      
    res.json({ mensaje: 'Estudiante dado de baja correctamente', estudiante: eliminado });
  } catch (error) {
    console.error('Error en DELETE:', error.message);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
};

const restaurar = async (req, res) => {
  try {
    // 🚨 ¡NUEVO! Extraemos el ID del usuario del parche temporal
    const id_usuario_modificacion = req.usuario.id_usuario;

    // Pasamos tanto el ID del estudiante como el del usuario
    const restaurado = await service.restaurar(req.params.id, id_usuario_modificacion);
    
    if (!restaurado)
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json({ mensaje: 'Estudiante reactivado correctamente', estudiante: restaurado });
  } catch (error) {
    console.error('Error en RESTAURAR:', error.message);
    res.status(500).json({ error: 'Error al reactivar el estudiante' });
  }
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar, restaurar };