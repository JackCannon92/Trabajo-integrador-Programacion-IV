const express = require('express');
const router = express.Router();

// Importamos las capas superiores (asegurate de que los archivos se llamen así en singular)
const estudiantesController = require('../controllers/estudiantesController');
const estudiantesValidator = require('../validators/estudiantesValidator');

// 1. BROWSE (Obtener todos)
router.get('/', estudiantesController.obtenerTodos);

// 2. READ (Buscar por ID)
router.get('/:id', estudiantesController.obtenerPorId);

// 3. ADD (Crear estudiante) 
// ¡Acá está tu línea 14! Controlá que estudiantesValidator exporte 'validarAlta' 
// y que estudiantesController exporte 'crearEstudiante'.
router.post('/', estudiantesValidator.validarAlta, estudiantesController.crearEstudiante);

// 4. EDIT (Modificar)
router.put('/:id', estudiantesValidator.validarAlta, estudiantesController.actualizarEstudiante);

// 5. DELETE (Borrado lógico)
router.delete('/:id', estudiantesController.eliminarEstudiante);

// 6. RESTAURAR (Reactivar)
router.patch('/:id/activar', estudiantesController.restaurarEstudiante);

module.exports = router;