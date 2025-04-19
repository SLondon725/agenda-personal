// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];

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
    let id = idTareas.length > 0 ? Math.max(...idTareas) + 1 : 1;
    titulosTareas.push(titulo);
    descripcionTareas.push(descripcion);
    fechaTareas.push(fecha);
    prioridadTareas.push(prioridad);
    idTareas.push(id);
    
    localStorage.setItem('arrTitulosT', JSON.stringify(titulosTareas));
    localStorage.setItem('arrDescripcionT', JSON.stringify(descripcionTareas));
    localStorage.setItem('arrFechaT', JSON.stringify(fechaTareas));
    localStorage.setItem('arrPrioridadT', JSON.stringify(prioridadTareas));
    localStorage.setItem('arrIdT', JSON.stringify(idTareas));

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
    titulosTareas.forEach((tituloT,i) => {

      let color = "#6c757d";
      let prioridadT = "Sin prioridad";
      switch (prioridadTareas[i]) {
      case '1':
          color = "#008000";
          prioridadT = " Baja";

          break;
      case '2':
          color = "#ffc107";
          prioridadT = " Media";
          break;
      case '3':
          color = "#dc3545";
          prioridadT = " Alta";
          break;
      }
      // Carta
      const card = document.createElement('div');
      card.classList.add("card", "col-12", "mb-3");
      card.style.borderLeft = `0.5rem solid ${color}`;
      // Body
      const cardB = document.createElement('div');
      cardB.classList.add("card-body");
      // Div titulo y prioridad
      const divT = document.createElement('div');
      divT.classList.add("d-flex","justify-content-between","align-items-start");
      // Titulo
      const titulo = document.createElement('h5');
      titulo.classList.add("card-title");
      titulo.textContent = tituloT;
      // Fecha parrafo
      const fecha = document.createElement('p');
      fecha.classList.add("card-text");
      // Fecha small
      const small = document.createElement('small');
      small.classList.add("text-body-secondary");
      small.textContent = fechaTareas[i];
      // Descripcción
      const parrafo = document.createElement('p');
      parrafo.classList.add("card-text");
      parrafo.textContent = descripcionTareas[i];
      // Prioridad
      const prioridad = document.createElement('p');
      prioridad.classList.add("mb-2");
      prioridad.innerHTML = `<strong>Prioridad:</strong> ${prioridadT}`
      // Div botones
      const divB = document.createElement('div');
      divB.classList.add("text-end");
      // Boton editar
      const editar = document.createElement('button');
      editar.classList.add("btn","btn-sm","btn-primary","me-2");

      editar.textContent = "Editar";
      // Boton eliminar
      const eliminar = document.createElement('button');
      eliminar.classList.add("btn","btn-sm","btn-danger");
      eliminar.textContent = "Eliminar";

      tareas.appendChild(card);
      card.appendChild(cardB);
      cardB.appendChild(divT);
      divT.appendChild(titulo);
      divT.appendChild(fecha);
      fecha.appendChild(small);
      cardB.appendChild(parrafo);
      cardB.appendChild(prioridad);
      cardB.appendChild(divB);
      divB.appendChild(editar);
      divB.appendChild(eliminar);

    });
}