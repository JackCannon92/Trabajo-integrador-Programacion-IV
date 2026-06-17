// Resalta automáticamente la pestaña activa de la navbar según la página actual.
// Se incluye en todas las páginas; no hace falta tocar la clase "active" a mano.
document.addEventListener('DOMContentLoaded', () => {
  // Nombre del archivo actual (ej: "cursos.html"). Si es la raíz, asume Inicio.
  const paginaActual = window.location.pathname.split('/').pop() || 'dashboard.html';
 
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    const destino = link.getAttribute('href');
    // Marca como activa SOLO la pestaña cuyo href coincide con la página actual.
    link.classList.toggle('active', destino === paginaActual);
  });
});
 