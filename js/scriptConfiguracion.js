// localStorage.clear();

// Constantes
// Guardar nombre de la persona
const nombreUsuario = document.getElementById('nombreUsuario');
const nombreGuardado = localStorage.getItem('nombreUsuario');
nombreUsuario.value = nombreGuardado;   // Para mostrar el nombre en la configuración

// Guardar e imprimir el nombre cada vez que cambia
nombreUsuario.addEventListener('input', () => {
    localStorage.setItem('nombreUsuario', nombreUsuario.value);
    console.log("Nombre actualizado:", nombreUsuario.value);
});

const mostrarCompletadas = document.getElementById('mostrarCompletadas');

// Cargar el estado guardado al iniciar
const estadoGuardado = localStorage.getItem('mostrarCompletadas');
if (estadoGuardado !== null) {
    mostrarCompletadas.checked = estadoGuardado === '1';
}

// Detectar cambios y guardar estado
mostrarCompletadas.addEventListener('change', () => {
    const estado = mostrarCompletadas.checked ? '1' : '0';
    localStorage.setItem('mostrarCompletadas', estado);
    console.log("Estado del mostrarCompletadas:", estado);
});


