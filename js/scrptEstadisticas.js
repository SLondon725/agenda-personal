// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];
let estadoTareas = JSON.parse(localStorage.getItem('arrEstadoT')) || [];

let cantidadT = [0,0,0,0];
let progresoT = [0,0];
// Sacando las tareas totales
let progresoTotal = estadoTareas.length;

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
    estadoTareas[i] == '1' ? progresoT[0]++ : progresoT[1]++;

});

let porcentaje = (progresoT[0]/progresoTotal)*100;

porcentaje = porcentaje.toFixed(1);


document.getElementById('tareasT').textContent = progresoTotal; // Mostrando las Tareas Totales
document.getElementById('tareasC').textContent = progresoT[0]; // Mostrando las Tareas Completas
document.getElementById('tareasI').textContent = progresoT[1]; // Mostrando las Tareas Incompletas
document.getElementById('tareasP').textContent = `${porcentaje} %`; // Mostrando el porcentaje del cumplimiento de la tareas

document.addEventListener('DOMContentLoaded', ()=> {
    const ctx = document.getElementById('graficoPrioridades').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sin prioridad', 'Baja', 'Media', 'Alta'],
            datasets: [{
                label: 'Tareas por prioridad',
                data: cantidadT,
                backgroundColor: [
                    '#6c757d',   // gris
                    '#28a745',   // verde
                    '#ffc107',   // amarillo
                    '#dc3545'    // rojo
                ],
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 15,
                    right: 15
                }
            },
            plugins: {
                legend: {
                    display: true,
                    onClick: () => null, // desactiva clic en leyenda
                    labels: {
                        color: '#333', // texto oscuro
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#333',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#333', // texto oscuro
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)' // cuadrícula gris claro
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#333',
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById('graficoTareas').getContext('2d');
    new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Completadas', 'Pendientes'],
        datasets: [{
        label: 'Tareas',
        data: progresoT,
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: '#fff',
        borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'top', // <-- Aquí la cambiamos a 'top'
            labels: {
            color: '#333',
            font: {
                size: 14,
                weight: 'bold'
            }
            }
        },
        tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff'
        }
        }
    }
    });

});




  