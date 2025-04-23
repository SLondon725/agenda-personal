// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];
let estadoTareas = JSON.parse(localStorage.getItem('arrEstadoT')) || [];

let coloresTareas = [];

prioridadTareas.forEach((prioridad,i) => {
    switch (prioridad) {
        case '0':
            coloresTareas.push("gray");
            break;
        case '1':
            coloresTareas.push("#008000");
            break;
        case '2':
            coloresTareas.push("#ffc107");
            break;
        case '3':
            coloresTareas.push("#dc3545");
            break;
    }
});

const eventos = titulosTareas.map((titulo, i) => ({
    title: titulo,
    date: fechaTareas[i],
    backgroundColor: coloresTareas[i],
}));

document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es', // idioma español
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        height: 'auto',
        events: eventos,
        dateClick: function (info) {
        const title = prompt('¿Qué tarea quieres agregar para el ' + info.dateStr + '?');
        if (title) {
            calendar.addEvent({ title: title, date: info.dateStr });
        }
        }
    });

    calendar.render();
});

