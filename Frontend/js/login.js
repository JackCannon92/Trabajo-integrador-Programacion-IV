const formLogin = document.getElementById('formLogin');
const mensajeError = document.getElementById('mensajeError');

formLogin.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    
    mensajeError.style.display = 'none';
    mensajeError.innerText = '';

    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rol = document.getElementById('rol').value;

        if (!rol) {
            throw new Error("Por favor, seleccione un perfil de ingreso.");
        }

        if (rol === 'profesor') {
            window.location.href = "panel.html"; 
        } else if (rol === 'alumno') {
            throw new Error("La vista de alumno se encuentra en desarrollo.");
        }


    } catch (error) {
        console.error("Fallo el login:", error.message);
        mensajeError.innerText = error.message;
        mensajeError.style.display = 'block';
    }
});