// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];
let estadoTareas = JSON.parse(localStorage.getItem('arrEstadoT')) || [];

let cantidadT = [0,0,0,0];
let progresoT = [0,0,0];
// Sacando las tareas totales
progresoT[0] = estadoTareas.length;

prioridadTareas.forEach((prioridad,i) => {
    // Sacando la cantidad de prioridades que hay de cada tarea
    switch (prioridad) {
        case '0':
            cantidadT[0] ++;
            break;
        case '1':
            cantidadT[1] ++;
            break;
        case '2':
            cantidadT[2] ++;  
            break;
        case '3':
            cantidadT[3] ++;    
            break;
    }
    // Sacando el total de tareas, pendientes, completas y su porcentaje de cumplimiento
    estadoTareas[i] == '1' ? progresoT[1]++ : progresoT[2]++;

});

let porcentaje = (progresoT[1]/progresoT[0])*100;

porcentaje = porcentaje.toFixed(1);


document.getElementById('tareasT').textContent = progresoT[0]; // Mostrando las Tareas Totales
document.getElementById('tareasC').textContent = progresoT[1]; // Mostrando las Tareas Completas
document.getElementById('tareasI').textContent = progresoT[2]; // Mostrando las Tareas Incompletas
document.getElementById('tareasP').textContent = `${porcentaje} %`; // Mostrando el porcentaje del cumplimiento de la tareas

document.addEventListener('DOMContentLoaded', ()=> {
    const ctx = document.getElementById('graficoPrioridades').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Tipo de grafica: 
        data: {
            labels: ['Sin prioridad','Baja', 'Media', 'Alta'],
            datasets: [{
                label: 'Tareas por prioridad',
                data: cantidadT,    // Aqui se pone el array con los datos
                backgroundColor: [
                'gray', // gris
                '#008000', // verde
                '#ffc107',  // amarillo
                '#dc3545'  // rojo
                ],
                borderColor: 'black',
                borderWidth: 1
            }]
        }
    });
    const ctx2 = document.getElementById('graficoTareas').getContext('2d');
    new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Total', 'Completadas', 'Pendientes'],
        datasets: [{
        label: 'Tareas',
        data: progresoT,
        backgroundColor: ['gray', '#008000', '#dc3545']
        }]
    }
    });
});




  