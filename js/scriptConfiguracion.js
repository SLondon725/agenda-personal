// localStorage.clear();

// Constantes y guardar en el localStorage
//  * Nombre de la persona
const nombreUsuario = document.getElementById('nombreUsuario');
const nombreGuardado = localStorage.getItem('nombreUsuario');
//  * Elejir si mostrar tareas terminadas o no en el calendario
const mostrarCompletadas = document.getElementById('mostrarCompletadas');
const estadoGuardado = localStorage.getItem('mostrarCompletadas');
//  * Tipo de calendario que quiere visualizar el usuario
const diseñoCalendario = document.getElementById('diseñoCalendario');
const estadoCalendario = localStorage.getItem('diseñoCalendario');

// Funciones
tema();
mostrarNombre();
mostrarTareas();
tipoCalendario();

function mostrarNombre(){
    nombreUsuario.value = nombreGuardado;   // Para mostrar el nombre en la configuración
    // Guardar e imprimir el nombre cada vez que cambia
    nombreUsuario.addEventListener('input', () => {
        localStorage.setItem('nombreUsuario', nombreUsuario.value);
        console.log("Nombre actualizado:", nombreUsuario.value);
    });
}

function mostrarTareas(){
    if (estadoGuardado !== null) {
        mostrarCompletadas.checked = estadoGuardado === '1';
    }
    // Detectar cambios y guardar estado
    mostrarCompletadas.addEventListener('change', () => {
        const estado = mostrarCompletadas.checked ? '1' : '0';
        localStorage.setItem('mostrarCompletadas', estado);
        console.log("Estado del mostrarCompletadas:", estado);
    });
}

function tipoCalendario(){
    // Restaurar el valor guardado
    if (estadoCalendario !== null) {
        diseñoCalendario.value = estadoCalendario;
    }

    // Detectar cambios y guardar el nuevo estado
    diseñoCalendario.addEventListener('change', () => {
        let diseñoC = diseñoCalendario.value || 'mes';
        localStorage.setItem('diseñoCalendario', diseñoC);
    });
}

function tema(){
    const cambiarTema = document.getElementById('temaOscuro');
    const html = document.documentElement;
    // Cargar el estado guardado al iniciar
    const temaGuardado = localStorage.getItem('cambiarTema');
    if (temaGuardado !== null) {
        // Si el tema guardado es '1', marcar el checkbox (modo oscuro)
        cambiarTema.checked = temaGuardado === '1';

        // Aplicar el tema guardado
        if (cambiarTema.checked) {
            html.setAttribute('data-bs-theme', 'dark');
        } else {
            html.setAttribute('data-bs-theme', 'light');
        }
    }

    // Detectar cambios y guardar el estado
    cambiarTema.addEventListener('change', () => {
        const estado = cambiarTema.checked ? '1' : '0';
        localStorage.setItem('cambiarTema', estado);

        // Cambiar el tema
        const nuevoTema = cambiarTema.checked ? 'dark' : 'light';
        html.setAttribute('data-bs-theme', nuevoTema);
    });

}


