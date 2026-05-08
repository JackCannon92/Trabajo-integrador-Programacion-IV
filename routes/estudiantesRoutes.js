const express = require('express');
const router = express.Router();

const estudiantesController = require('../controllers/estudiantesController');

// Definimos el mapa de rutas. 
// Nota: La palabra '/estudiantes' la configuraremos en el index.js, 
// por lo que aquí solo usamos '/' o '/:id'

// 1. BROWSE (Obtener todos)
router.get('/', estudiantesController.obtenerTodos);

// 2. READ (Obtener uno por ID)
router.get('/:id', estudiantesController.obtenerPorId);

// 3. ADD (Crear un estudiante)
router.post('/', estudiantesController.crear);

// 4. EDIT (Actualizar un estudiante)
router.put('/:id', estudiantesController.actualizar);

// 5. DELETE (Baja lógica)
router.delete('/:id', estudiantesController.eliminar);

// 6. RESTAURAR (Reactivar estudiante)
router.patch('/:id/activar', estudiantesController.restaurar);

// Exportamos las rutas para que el archivo principal (index.js) las pueda usar
module.exports = router;