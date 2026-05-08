const estudiantesService = require('../services/estudiantesService');

// 1. BROWSE
const obtenerTodos = async (_req, res) => { // Usamos _req como convención profesional
  try {
    const estudiantes = await estudiantesService.obtenerTodos();
    res.json(estudiantes);
  } catch (error) {
    console.error("Error en BROWSE:", error.message);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

// 2. READ
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await estudiantesService.obtenerPorId(id);
    
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado o inactivo' });
    }
    res.json(estudiante);
  } catch (error) {
    console.error("Error en READ:", error.message);
    res.status(500).json({ error: 'Error al buscar el estudiante' });
  }
};

// 3. ADD
const crear = async (req, res) => {
  try {
    const nuevoEstudiante = await estudiantesService.crear(req.body);
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    console.error("Error en ADD:", error.message);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};

// 4. EDIT
const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const estudianteActualizado = await estudiantesService.actualizar(id, req.body);
    
    if (!estudianteActualizado) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado para editar' });
    }
    res.json(estudianteActualizado);
  } catch (error) {
    console.error("Error en EDIT:", error.message);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

// 5. DELETE
const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const estudianteEliminado = await estudiantesService.eliminar(id);
    
    if (!estudianteEliminado) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado para eliminar' });
    }
    res.json({ mensaje: 'Estudiante dado de baja correctamente', estudiante: estudianteEliminado });
  } catch (error) {
    console.error("Error en DELETE:", error.message);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
};

// 6. RESTAURAR
const restaurar = async (req, res) => {
  try {
    const { id } = req.params;
    const estudianteRestaurado = await estudiantesService.restaurar(id);
    
    if (!estudianteRestaurado) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado en la base de datos' });
    }
    res.json({ mensaje: 'Estudiante reactivado correctamente', estudiante: estudianteRestaurado });
  } catch (error) {
    console.error("Error en RESTAURAR:", error.message);
    res.status(500).json({ error: 'Error al reactivar el estudiante' });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restaurar
};