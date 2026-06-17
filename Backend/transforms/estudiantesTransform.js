// Da formato a la salida de estudiantes (lo que recibe el frontend)
const transformarEstudiante = (estudiante) => {
  return {
    id:        estudiante.id_estudiante,
    documento: estudiante.documento,
    apellido:  estudiante.apellido,
    nombres:   estudiante.nombres,
    email:     estudiante.email,
    fecha_nacimiento: estudiante.fecha_nacimiento
      ? new Date(estudiante.fecha_nacimiento).toLocaleDateString('es-AR')
      : null,
    estado: estudiante.activo === 1 ? 'Activo' : 'Inactivo',
  };
};

const transformarListaEstudiantes = (estudiantes) => {
  return estudiantes.map(transformarEstudiante);
};

export { transformarEstudiante, transformarListaEstudiantes };
