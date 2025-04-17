document.getElementById('todayDate').textContent = new Date().toLocaleDateString(); // Sacar fecha local
// Constantes
const hoy = new Date().toISOString().split('T')[0]; // Sacar la fecha local en formato ingles
const modal = document.getElementById('modalFormulario'); // Modal del nuevo registro
const btnGuardar = document.getElementById('guardar');  // Guardar nuevo registro

// LocalStorage
// Arrays con el localStorage

// 1. Tareas
let titulosT = localStorage.getItem('arrTitulosT');
let titulosTareas = titulosT ? JSON.parse(titulosT) : [];

let descripcionT = localStorage.getItem('arrDescripcionT');
let descripcionTareas = descripcionT ? JSON.parse(descripcionT) : [];

let fechaT = localStorage.getItem('arrFechaT');
let fechaTareas = fechaT ? JSON.parse(fechaT) : [];

let prioridadT = localStorage.getItem('arrPrioridadT');
let prioridadTareas = prioridadT ? JSON.parse(prioridadT) : [];


// evento para reiniciar el modal 
modal.addEventListener('hidden.bs.modal',()=> { document.getElementById('formModal').reset();  });

btnGuardar.addEventListener('click',()=>{
  // Trayendo los valores del nuevo registro
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let fecha = document.getElementById("fecha").value;
  let prioridad = document.getElementById("prioridad").value;

  // Validando si faltan datos
  if (titulo === "" || descripcion === "" || fecha === "") {
    // Alerta de campos incompletos
    Swal.fire({
      title: 'Campos Incompletos',
      icon: 'warning',
      text: 'Debe llenar todos los campos',
      position: 'top',
      toast: true,         // Hace que sea un mensajito como "toast"
      timer: 3000,         // Se cierra en 3 segundos
      showConfirmButton: false
    });
  }else{
    // Si todos los campos estan llenos se procede a guardar la tarea en los arrays
    titulosTareas.push(titulo);
    descripcionTareas.push(descripcion);
    fechaTareas.push(fecha);
    prioridadTareas.push(prioridad);

    localStorage.setItem('arrTitulosT', JSON.stringify(titulosTareas));
    localStorage.setItem('arrDescripcionT', JSON.stringify(descripcionTareas));
    localStorage.setItem('arrFechaT', JSON.stringify(fechaTareas));
    localStorage.setItem('arrPrioridadT', JSON.stringify(prioridadTareas));


    // Alerta para hacer saber que se genero un nuevo registro
    Swal.fire({
      title: '¡Nuevo registro!',
      text: 'Tu tarea se registro de forma correcta',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
})

console.log(titulosTareas);