
const transformarEstudiante = (estudiante) => {

  return {
    id: estudiante.id_estudiante,
    documento: estudiante.documento,
    apellido: estudiante.apellido,
    nombres: estudiante.nombres,
    email: estudiante.email,
    // Formateamos la fecha para que se vea legible (ej: 12/05/2026)
    fecha_nacimiento: estudiante.fecha_nacimiento 
      ? new Date(estudiante.fecha_nacimiento).toLocaleDateString('es-AR') 
      : null,
    estado: estudiante.activo === 1 ? 'Activo' : 'Inactivo'
  };
};

const transformarListaEstudiantes = (estudiantes) => {
  return estudiantes.map(transformarEstudiante);
};

module.exports = {
  transformarEstudiante,
  transformarListaEstudiantes
};