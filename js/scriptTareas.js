// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];

// localStorage.clear();
// Constantes
const tareas = document.getElementById('tareas');
const modal = document.getElementById('modalFormulario'); // Modal del nuevo registro
const btnGuardar = document.getElementById('guardar')

// Funciones a ejecutar al ingresar a la pagina
agregarTarea()

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

    agregarTarea();

    // Alerta para hacer saber que se genero un nuevo registro
    Swal.fire({
      title: '¡Nuevo registro!',
      text: 'Tu tarea se registro de forma correcta',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
})

function agregarTarea(){
    tareas.innerHTML = '';  //  Se inicializa en vacio
    titulosTareas.forEach((titulo,i) => {

        const col = document.createElement('div'); // Creando el div que contendra toda la carta
            col.classList.add("col-md-3","col-sm-6","my-2");   // Agregando clases al div creado

            const card = document.createElement('div'); // Creando el div que contendra toda la carta
            card.classList.add("card");   // Agregando clases al div creado
            card.style.width = "18rem";
            col.appendChild(card);

            // Primer card body
            const cardB = document.createElement('div');
            cardB.classList.add("card-body","text-start");
            card.appendChild(cardB);

            const tituloB = document.createElement('h3');
            tituloB.classList.add('card-title');
            tituloB.innerHTML = (`<strong>${titulo}<strong>`);
            cardB.appendChild(tituloB);

            const descripcionB = document.createElement('h6');
            descripcionB.classList.add('card-subtitle','mb-2');
            descripcionB.innerHTML = (`<strong>${descripcionTareas[i]}<strong>`);
            cardB.appendChild(descripcionB);

            const fechaB = document.createElement('h6');
            fechaB.classList.add('card-subtitle','mb-2');
            fechaB.innerHTML = (`<strong>${fechaTareas[i]}<strong>`);
            cardB.appendChild(fechaB);

            let prio = "";

           switch (prioridadTareas[i]) {
            case '1':
                prio = "Baja"
                break;
            case '2':
                prio = "Media"
                break;
            case '3':
                prio = "Alta"
                break;
           }
            const prioridadB = document.createElement('h6');
            prioridadB.classList.add('card-subtitle','mb-2');
            prioridadB.innerHTML = (`<strong>${prio}<strong>`);
            cardB.appendChild(prioridadB);

            tareas.appendChild(col);

    });

}

