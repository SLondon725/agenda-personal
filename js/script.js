document.getElementById('todayDate').textContent = new Date().toLocaleDateString(); // Sacar fecha local
// Constantes
const hoy = new Date().toISOString().split('T')[0]; // Sacar la fecha local en formato ingles
const modal = document.getElementById('modalFormulario'); // Modal del nuevo registro
const btnGuardar = document.getElementById('guardar');  // Guardar nuevo registro
const tareasImportantes = document.getElementById('tareasImportantes'); //  Mostrando las tareas importantes

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

let idT = localStorage.getItem('arrIdT');
let idTareas = idT ? JSON.parse(idT) : [];

// Variable para saber si se esta editando
let indiceEdicion = null;

// Funciones a ejecutar al ingresar a la pagina
agregarTarea();

// evento para reiniciar el modal 
modal.addEventListener('hidden.bs.modal',()=> { document.getElementById('formModal').reset();  });

// Evento para agregar o editar tarea
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
    // Si todos los campos estan llenos se procede a guardar la tarea en los arrays y verificar si se esta editando o creando un nuevo registro

    if (indiceEdicion !== null) {
      // Editar tarea existente
      titulosTareas[indiceEdicion] = titulo;
      descripcionTareas[indiceEdicion] = descripcion;
      fechaTareas[indiceEdicion] = fecha;
      prioridadTareas[indiceEdicion] = prioridad;
      indiceEdicion = null;
      // Alerta para tarea actualizada
      Swal.fire({
        title: '¡Tarea editada!',
        text: 'Los datos se actualizaron correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      indiceEdicion = null;
    }else{
      let id = idTareas.length > 0 ? Math.max(...idTareas) + 1 : 1;
      titulosTareas.push(titulo);
      descripcionTareas.push(descripcion);
      fechaTareas.push(fecha);
      prioridadTareas.push(prioridad);
      idTareas.push(id);

      // Alerta para hacer saber que se genero un nuevo registro
      Swal.fire({
        title: '¡Nuevo registro!',
        text: 'Tu tarea se registro de forma correcta',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    localStorage.setItem('arrTitulosT', JSON.stringify(titulosTareas));
    localStorage.setItem('arrDescripcionT', JSON.stringify(descripcionTareas));
    localStorage.setItem('arrFechaT', JSON.stringify(fechaTareas));
    localStorage.setItem('arrPrioridadT', JSON.stringify(prioridadTareas));
    localStorage.setItem('arrIdT', JSON.stringify(idTareas));

    agregarTarea();
  }
})

function agregarTarea(){
  tareasImportantes.innerHTML = '';  //  Se inicializa en vacio
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
    // Aqui se inicia el filtrado
    if (prioridadTareas[i] === "3") {
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
      const btnEditar = document.createElement('button');
      btnEditar.classList.add("btn","btn-sm","btn-primary","me-2","editar");
      btnEditar.textContent = "Editar";
      btnEditar.id = `editar${idTareas[i]}`;

      // Boton eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add("btn","btn-sm","btn-danger","eliminar");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.id = `eliminar${idTareas[i]}`;

      tareasImportantes.appendChild(card);
      card.appendChild(cardB);
      cardB.appendChild(divT);
      divT.appendChild(titulo);
      divT.appendChild(fecha);
      fecha.appendChild(small);
      cardB.appendChild(parrafo);
      cardB.appendChild(prioridad);
      cardB.appendChild(divB);
      divB.appendChild(btnEditar);
      divB.appendChild(btnEliminar);
    }

  });
  // Eliminar tarea 
  const eliminar = document.querySelectorAll('.eliminar');

  eliminar.forEach(eleccion => {
    eleccion.addEventListener('click', ()=>{
        
        let idT = (eleccion.id);
        idTareas.forEach((id,i) => {
          id = `eliminar${idTareas[i]}`
          if (idT === id) {
            // Confirmacion para eliminar elemento
            Swal.fire({
              title: '¿Estás seguro?',
              text: 'No podrás revertir esta acción',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar'
            }).then((resultado) => {
              if (resultado.isConfirmed) {
                // Eliminando la tarea seleccionada
                titulosTareas.splice(i,1);
                descripcionTareas.splice(i,1);
                fechaTareas.splice(i,1);
                prioridadTareas.splice(i,1);
                idTareas.splice(i,1);
                
                localStorage.setItem('arrTitulosT', JSON.stringify(titulosTareas));
                localStorage.setItem('arrDescripcionT', JSON.stringify(descripcionTareas));
                localStorage.setItem('arrFechaT', JSON.stringify(fechaTareas));
                localStorage.setItem('arrPrioridadT', JSON.stringify(prioridadTareas));
                localStorage.setItem('arrIdT', JSON.stringify(idTareas));

                Swal.fire({
                  title: '¡Eliminado!',
                  text: 'Tu tarea ha sido eliminada.',
                  icon: 'success',
                  position: 'top',
                  toast: true,         // Hace que sea un mensajito como "toast"
                  timer: 3000,         // Se cierra en 3 segundos
                  showConfirmButton: false
                });
                agregarTarea();
              }
            })
          }
        });
    });
  });
  // Editar tarea
  const editar = document.querySelectorAll('.editar');
  editar.forEach(eleccion => {
    eleccion.addEventListener('click', ()=>{
        
        let idT = (eleccion.id);
        idTareas.forEach((id,i) => {

          if (idT === `editar${id}`) {
            // Confirmacion para eliminar elemento
            console.log(id);
             // Llenamos los inputs
            document.getElementById('titulo').value = titulosTareas[i];
            document.getElementById('descripcion').value = descripcionTareas[i];
            document.getElementById('fecha').value = fechaTareas[i];
            document.getElementById('prioridad').value = prioridadTareas[i]; 

            var myModal = new bootstrap.Modal(document.getElementById('modalFormulario'));
            indiceEdicion = i;
            myModal.show();
          }
        });
    });
  });
}
