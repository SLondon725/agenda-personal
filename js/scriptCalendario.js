// Constantes recuperadas localStorage
const tareasCompletadas = localStorage.getItem('mostrarCompletadas') || '0';    //Mostrar tareas completadas en el calendario
const diseñoCalendario = localStorage.getItem('diseñoCalendario') || 'mes'; //Mostrar el calendario por dia, semana o mes
const cambiarTema = localStorage.getItem('cambiarTema') || '0'; // Cambiar a tema oscuro

// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];
let estadoTareas = JSON.parse(localStorage.getItem('arrEstadoT')) || [];

let coloresTareas = []; // Colores de las tareas
let TipoCalendario = 'dayGridMonth';  // Inicializando la variable del tipo de calendario en mes
let dayHeaderFormat = { weekday: 'short', day: 'numeric' };  // Valor por defecto

// Funciones
tema();

// Que diseño de calendario se tendra si por mes, semanas o dias
switch (diseñoCalendario) {
    case 'mes': 
        TipoCalendario = 'dayGridMonth'; 
        dayHeaderFormat = { weekday: 'short' };
        break;
    case 'semana': 
        TipoCalendario = 'dayGridWeek'; 
        dayHeaderFormat = { weekday: 'short', day: 'numeric' };
        break;
    case 'dia': 
        TipoCalendario = 'dayGridDay';
        dayHeaderFormat = { weekday: 'long'}; 
        break;
}

// Asignación de colores y filtrado por tareas completas/pendientes
prioridadTareas.forEach((prioridad,i) => {
    switch (prioridad) {
        case '0': coloresTareas.push("878787"); break;
        case '1': coloresTareas.push("#008000"); break;
        case '2': coloresTareas.push("#ffc107"); break;
        case '3': coloresTareas.push("#dc3545"); break;
    }
    coloresTareas[i] = estadoTareas[i] == 1 ? "#D3D3D3" : coloresTareas[i];
});

const eventos = titulosTareas.map((titulo, i) => {
    if (tareasCompletadas === '0') {
        if (estadoTareas[i] === 0) {
            return {
                title: titulo,
                date: fechaTareas[i],
                backgroundColor: coloresTareas[i],
                className: 'evento-tarea'
            };
        } else {
            return null;
        }
    }else{
        return {
            title: titulo,
            date: fechaTareas[i],
            backgroundColor: coloresTareas[i],
            className: 'evento-tarea'
        };
    }
}).filter(evento => evento !== null); // Filtrar los nulls



document.addEventListener('DOMContentLoaded', function () {
    const calendarioEl = document.getElementById('calendario');

    const calendario = new FullCalendar.Calendar(calendarioEl, {
        locale: 'es', // Establecer idioma español
        initialView: `${TipoCalendario}`, // Vista inicial: 'dayGridMonth', 'dayGridWeek', 'dayGridDay'
        themeSystem: 'bootstrap5',
        height: 'auto',
        events: eventos,
        dayHeaderFormat: dayHeaderFormat

    });

    calendario.render();
});


  
  

// Cambio de tema dependiendo la configuración
function tema(){
    const html = document.documentElement;

    // Aplicar el tema guardado
    if (cambiarTema === '1') {
        html.setAttribute('data-bs-theme', 'dark');
    } else {
        html.setAttribute('data-bs-theme', 'light');
    }

}