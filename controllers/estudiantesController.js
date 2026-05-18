// Importamos el servicio (y el transformador si ya lo tenés armado)
const estudiantesService = require('../services/estudiantesService');
// const estudiantesTransform = require('../Transforms/estudiantesTransform'); 

// 1. BROWSE
async function obtenerTodos(req, res) {
    try {
        const resultado = await estudiantesService.obtenerTodos();
        res.json(resultado);
    } catch (error) {
        // ¡AGREGAMOS ESTA LÍNEA PARA VER EL ERROR REAL EN LA CONSOLA!
        console.error("🔥 ERROR REAL DEL SERVIDOR:", error); 
        
        res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
}

// 2. READ
async function obtenerPorId(req, res) {
    try {
        const { id } = req.params;
        const resultado = await estudiantesService.obtenerPorId(id);
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado o inactivo' });
        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el estudiante' });
    }
}

// 3. ADD (Acá estaba el problema, ¡ahora se llama crearEstudiante!)
async function crearEstudiante(req, res) {
    try {
        // Le pasamos al servicio los datos que ya pasaron por el validador
        const resultado = await estudiantesService.crear(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estudiante' });
    }
}

// 4. EDIT
async function actualizarEstudiante(req, res) {
    try {
        const { id } = req.params;
        const resultado = await estudiantesService.actualizar(id, req.body);
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado para editar' });
        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
}

// 5. DELETE
async function eliminarEstudiante(req, res) {
    try {
        const { id } = req.params;
        // Asumiendo que el usuario que modifica es el ID 1 por ahora
        const resultado = await estudiantesService.eliminar(id, 1);
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado para eliminar' });
        }
        res.json({ mensaje: 'Estudiante dado de baja correctamente', estudiante: resultado });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
}

// 6. RESTAURAR
async function restaurarEstudiante(req, res) {
    try {
        const { id } = req.params;
        const resultado = await estudiantesService.restaurar(id, 1);
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado en la base de datos' });
        }
        res.json({ mensaje: 'Estudiante reactivado correctamente', estudiante: resultado });
    } catch (error) {
        res.status(500).json({ error: 'Error al reactivar el estudiante' });
    }
}

// Exportamos exactamente los mismos nombres que definimos arriba
module.exports = {
    obtenerTodos,
    obtenerPorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    restaurarEstudiante
};