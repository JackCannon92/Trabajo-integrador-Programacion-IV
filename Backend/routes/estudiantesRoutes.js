const express = require('express');
const router = express.Router();

const estudiantesController = require('../controllers/estudiantesController');
const estudiantesValidator = require('../validators/estudiantesValidator');

// 🚨 PARCHE TEMPORAL: Simulamos que el usuario Administrador (ID 1) está logueado 
// para que no explote el "req.usuario.id_usuario" del código de Franquito.
router.use((req, res, next) => {
    req.usuario = { id_usuario: 1 };
    next();
});

// 1. BROWSE
router.get('/', estudiantesController.obtenerTodos);

// 2. READ
router.get('/:id', estudiantesController.obtenerPorId);

// 3. ADD - Acá usamos el nombre exacto que le puso Franquito (.crear)
router.post('/', estudiantesValidator.validarAlta, estudiantesController.crear);

// 4. EDIT - Acá usamos .actualizar
router.put('/:id', estudiantesValidator.validarAlta, estudiantesController.actualizar);

// 5. DELETE - Acá usamos .eliminar
router.delete('/:id', estudiantesController.eliminar);

// 6. RESTAURAR - Acá usamos .restaurar
router.patch('/:id/activar', estudiantesController.restaurar);

module.exports = router;