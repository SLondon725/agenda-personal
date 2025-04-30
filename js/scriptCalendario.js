// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];
let estadoTareas = JSON.parse(localStorage.getItem('arrEstadoT')) || [];

//Mostrar tareas completadas en el calendario
const tareasCompletadas = localStorage.getItem('mostrarCompletadas');

let coloresTareas = [];

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



document.addEventListener('DOMContentLoaded', () => {
    const calendarioEl = document.getElementById('calendario');

    const calendario = new FullCalendar.Calendar(calendarioEl, {
        locale: 'es', // idioma español
            // initialView: 'dayGridMonth', // Vista por MES
            // initialView: 'dayGridWeek',  // Vista por SEMANA sin horas
            // initialView: 'dayGridDay',   // Vista por DÍA sin horas
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        height: 'auto',
        events: eventos,
    });

    calendario.render();
});