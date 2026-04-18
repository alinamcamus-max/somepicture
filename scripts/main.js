// Función para iniciar sesión
function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const authMsg = document.getElementById('auth-msg');

    // Limpiar mensaje anterior
    authMsg.textContent = '';

    // Validaciones básicas
    if (!email || !password) {
        authMsg.textContent = 'Por favor, ingresa tu correo electrónico y contraseña.';
        authMsg.style.color = 'red';
        return;
    }

    // Obtener usuarios registrados del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];

    // Verificar si existe un usuario con el email y contraseña coincidentes
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

    if (usuarioEncontrado) {
        // Inicio de sesión exitoso, redirigir a principal.html
        window.location.href = 'principal.html';
    } else {
        // Error: credenciales incorrectas
        authMsg.textContent = 'Correo electrónico o contraseña incorrectos.';
        authMsg.style.color = 'red';
    }
}

// Función para cerrar sesión (si es necesaria)
function logout() {
    // Aquí puedes agregar lógica para cerrar sesión si usas Firebase o similar
    // Por ahora, solo ocultar la sección principal y mostrar la de auth
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'none';
}