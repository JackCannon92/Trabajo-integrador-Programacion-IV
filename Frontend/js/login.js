// Login — envía credenciales a la API y guarda el token (JWT) en localStorage
const API_AUTH = 'http://localhost:3000/auth/login';

// Si ya hay token, va directo a Inicio
if (localStorage.getItem('token')) {
  window.location.href = 'dashboard.html';
}

// Referencias al DOM
const formLogin    = document.getElementById('formLogin');
const inputUsuario = document.getElementById('nombre_usuario');
const inputClave   = document.getElementById('contrasenia');
const btnLogin     = document.getElementById('btnLogin');
const alertaLogin  = document.getElementById('alertaLogin');

const mostrarError = (mensaje) => {
  alertaLogin.textContent = mensaje;
  alertaLogin.classList.remove('d-none');
};
const ocultarError = () => alertaLogin.classList.add('d-none');

// Estado de carga del botón
const setLoading = (cargando) => {
  btnLogin.disabled = cargando;
  btnLogin.innerHTML = cargando
    ? `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Ingresando...`
    : `<i class="bi bi-box-arrow-in-right me-2"></i>Ingresar`;
};

// Envío del formulario
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  ocultarError();

  const nombre_usuario = inputUsuario.value.trim();
  const contrasenia    = inputClave.value;

  if (!nombre_usuario || !contrasenia) {
    mostrarError('Completá todos los campos.');
    return;
  }

  setLoading(true);
  try {
    // fetch a la API
    const respuesta = await fetch(API_AUTH, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ nombre_usuario, contrasenia }),
    });

    const datos = await respuesta.json();
    if (!respuesta.ok) {
      mostrarError(datos.error || 'Error al iniciar sesión.');
      return;
    }

    // Guarda token y usuario en localStorage
    localStorage.setItem('token',   datos.token);
    localStorage.setItem('usuario', JSON.stringify(datos.usuario));

    // 👉 Primero se ve la pestaña de Inicio
    window.location.href = 'dashboard.html';

  } catch (error) {
    mostrarError('No se pudo conectar con el servidor. ¿Está corriendo node index.js?');
  } finally {
    setLoading(false);
  }
});

inputUsuario.addEventListener('input', ocultarError);
inputClave.addEventListener('input', ocultarError);