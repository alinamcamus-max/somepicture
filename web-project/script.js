// Elementos del DOM
const formulario = document.getElementById('registroForm');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputContraseña = document.getElementById('contraseña');
const inputConfirmarContraseña = document.getElementById('confirmarContraseña');
const mensajeDiv = document.getElementById('mensaje');
const listadoUsuarios = document.getElementById('listadoUsuarios');
const btnLimpiarLS = document.getElementById('limpiarLS');

// Clave para localStorage
const CLAVE_USUARIOS = 'usuarios_registrados';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarUsuarios();
    formulario.addEventListener('submit', manejarRegistro);
    btnLimpiarLS.addEventListener('click', limpiarLocalStorage);
});

// Función para manejar el registro
function manejarRegistro(evento) {
    evento.preventDefault();

    // Obtener valores del formulario
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const contraseña = inputContraseña.value;
    const confirmarContraseña = inputConfirmarContraseña.value;

    // Validaciones
    if (!nombre) {
        mostrarMensaje('Por favor ingresa un nombre', 'error');
        return;
    }

    if (!email) {
        mostrarMensaje('Por favor ingresa un email', 'error');
        return;
    }

    if (!validarEmail(email)) {
        mostrarMensaje('Por favor ingresa un email válido', 'error');
        return;
    }

    if (contraseña.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    if (contraseña !== confirmarContraseña) {
        mostrarMensaje('Las contraseñas no coinciden', 'error');
        return;
    }

    if (emailYaRegistrado(email)) {
        mostrarMensaje('Este email ya está registrado', 'error');
        return;
    }

    // Crear objeto de usuario
    const nuevoUsuario = {
        id: generarId(),
        nombre: nombre,
        email: email,
        contraseña: contraseña, // En una aplicación real, esto debería estar encriptado
        fechaRegistro: new Date().toLocaleString('es-ES')
    };

    // Guardar en localStorage
    guardarUsuario(nuevoUsuario);

    // Mostrar mensaje de éxito
    mostrarMensaje(`¡Bienvenido ${nombre}! Tu registro fue exitoso`, 'success');

    // Limpiar formulario
    formulario.reset();

    // Recargar listado de usuarios
    cargarUsuarios();
}

// Validar formato de email
function validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
}

// Verificar si el email ya está registrado
function emailYaRegistrado(email) {
    const usuarios = obtenerUsuarios();
    return usuarios.some(usuario => usuario.email.toLowerCase() === email.toLowerCase());
}

// Guardar usuario en localStorage
function guardarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

// Obtener todos los usuarios de localStorage
function obtenerUsuarios() {
    const usuariosJSON = localStorage.getItem(CLAVE_USUARIOS);
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

// Cargar y mostrar usuarios en la página
function cargarUsuarios() {
    const usuarios = obtenerUsuarios();
    listadoUsuarios.innerHTML = '';

    if (usuarios.length === 0) {
        listadoUsuarios.innerHTML = '<p class="vacio">No hay usuarios registrados aún</p>';
        return;
    }

    usuarios.forEach(usuario => {
        const usuarioCard = document.createElement('div');
        usuarioCard.className = 'usuario-card';
        usuarioCard.innerHTML = `
            <h3>${usuario.nombre}</h3>
            <p class="email">📧 ${usuario.email}</p>
            <p class="fecha">📅 Registrado: ${usuario.fechaRegistro}</p>
            <button type="button" class="btn-eliminar" onclick="eliminarUsuario('${usuario.id}')">Eliminar</button>
        `;
        listadoUsuarios.appendChild(usuarioCard);
    });
}

// Eliminar un usuario específico
function eliminarUsuario(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        let usuarios = obtenerUsuarios();
        usuarios = usuarios.filter(usuario => usuario.id !== id);
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
        cargarUsuarios();
        mostrarMensaje('Usuario eliminado correctamente', 'success');
    }
}

// Limpiar todo localStorage
function limpiarLocalStorage() {
    if (confirm('¿Estás seguro de que deseas eliminar TODOS los usuarios? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(CLAVE_USUARIOS);
        cargarUsuarios();
        mostrarMensaje('localStorage limpiado correctamente', 'success');
    }
}

// Mostrar mensaje de feedback
function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        mensajeDiv.className = 'mensaje';
    }, 5000);
}

// Generar un ID único
function generarId() {
  
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  function uploadVideo() {
  const file = document.getElementById('video-upload').files[0];
  const title = document.getElementById('video-title').value;
  const uploadMsg = document.getElementById('upload-msg');
  const user = firebase.auth().currentUser;
  if (!file) {
    uploadMsg.textContent = "Selecciona un video.";
    return;
  }
  if (!title) {
    uploadMsg.textContent = "Ponle un título al video.";
    return;
  }
  const storageRef = firebase.storage().ref('videos/' + user.uid + '/' + Date.now() + '_' + file.name);
  uploadMsg.textContent = "Subiendo...";
  storageRef.put(file).then(snapshot => {
    snapshot.ref.getDownloadURL().then(url => {
      firebase.firestore().collection('videos').add({
        url,
        userId: user.uid,
        userEmail: user.email,
        titulo: title,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      uploadMsg.textContent = "¡Video subido!";
      document.getElementById('video-upload').value = "";
      document.getElementById('video-title').value = "";
      buscarVideos();
    });
  }).catch(e => uploadMsg.textContent = e.message);
function toggleChat() {
  const chatSection = document.getElementById('chat-section');
  if (chatSection.style.display === 'none' || !chatSection.style.display) {
    chatSection.style.display = 'block';
  } else {
    chatSection.style.display = 'none';
  }
}
}
}
