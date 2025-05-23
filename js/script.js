// Constantes
const hoy = new Date();
const fechaActual = hoy.getFullYear() + '-' +
  String(hoy.getMonth() + 1).padStart(2, '0') + '-' +
  String(hoy.getDate()).padStart(2, '0'); // Sacar la fecha del dia en el que se encuentra
const modal = document.getElementById('modalFormulario'); // Modal del nuevo registro
const btnGuardar = document.getElementById('guardar');  // Guardar nuevo registro
const tareasImportantes = document.getElementById('tareasImportantes'); //  Mostrando las tareas importantes
const resumenDia = document.getElementById('resumenDia'); //  Mostrando las tareas importantes
const nombreU = document.getElementById('nombreUsuario'); //  Mostrando las tareas importantes

document.getElementById('fechaActual').textContent = fechaActual; // Mostrando la fecha actual

// Cambiar a tema oscuro
const cambiarTema = localStorage.getItem('cambiarTema') || '0';
console.log("el tema esta en ",cambiarTema);


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

let estadoT = localStorage.getItem('arrEstadoT');
let estadoTareas = estadoT ? JSON.parse(estadoT) : [];

//Recuperando el nombre de usuario
const nombre = localStorage.getItem('nombreUsuario') || 'Usuario';
nombreU.textContent = nombre;


// Variable para saber si se esta editando
let indiceEdicion = null;

// Funciones a ejecutar al ingresar a la pagina
agregarTarea();
mostrarResumen();
tema();

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
      estadoTareas.push(0);

      localStorage.setItem('arrEstadoT', JSON.stringify(estadoTareas));


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

    mostrarResumen();
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
    if (prioridadTareas[i] === "3" && estadoTareas[i] === 0) {
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
      // Check estado de la tarea
      const divCheck = document.createElement('div');
      divCheck.classList.add("form-check");
      // input 
      const inputCheck = document.createElement('input');
      inputCheck.classList.add("form-check-input");
      inputCheck.type = 'checkbox';
      inputCheck.id = `check${idTareas[i]}`;
      // Label
      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.setAttribute('for', `check${idTareas[i]}`);
      label.textContent = 'Tarea completada';
      // Boton editar
      const btnEditar = document.createElement('button');
      btnEditar.classList.add("btn","btn-sm","btn-primary","me-2","editarImportante");
      btnEditar.textContent = "Editar";
      btnEditar.id = `editarImportante${idTareas[i]}`;
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
      cardB.appendChild(divCheck);
      divCheck.appendChild(inputCheck);
      divCheck.appendChild(label);
      cardB.appendChild(divB);
      divB.appendChild(btnEditar);
      divB.appendChild(btnEliminar);
    }

  });
  // Eliminar tarea 
  eliminarTarea();
  // Editar tarea 
  editarTarea();
  // Marcar tarea como completa
  checkTareaCompleta();
  
}
// Funcion eliminar tarea
function eliminarTarea(){
  const eliminar = document.querySelectorAll('.eliminar');
  eliminar.forEach(eleccion => {
    eleccion.addEventListener('click', ()=>{
        
        let idT = (eleccion.id);
        idTareas.forEach((id,i) => {

          if (idT === `eliminar${id}` || idT === `eliminar${id}2`) {
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
                estadoTareas.splice(i,1);
                
                localStorage.setItem('arrTitulosT', JSON.stringify(titulosTareas));
                localStorage.setItem('arrDescripcionT', JSON.stringify(descripcionTareas));
                localStorage.setItem('arrFechaT', JSON.stringify(fechaTareas));
                localStorage.setItem('arrPrioridadT', JSON.stringify(prioridadTareas));
                localStorage.setItem('arrIdT', JSON.stringify(idTareas));
                localStorage.setItem('arrEstadoT', JSON.stringify(estadoTareas));

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
                mostrarResumen();
              }
            })
          }
        });
    });
  });
  
}
// Funcion editar tarea (importantes)
function editarTarea(){
  const editarI = document.querySelectorAll('.editarImportante');

  editarI.forEach(eleccion => {
    eleccion.addEventListener('click', ()=>{
        
        let idT = (eleccion.id);
        idTareas.forEach((id,i) => {
          if (idT === `editarImportante${id}`) {
            // Confirmacion para eliminar elemento
            console.log("selecciono editar importante dia ",id);
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
// Funcion editar tareas del dia (resumen)
function editarResumen(){
  const editarR = document.querySelectorAll('.editarResumen');

  editarR.forEach(eleccion => {
    eleccion.addEventListener('click', ()=>{
        
        let idT = (eleccion.id);
        idTareas.forEach((id,i) => {

          if (idT === `editarResumen${id}`) {
            // Confirmacion para eliminar elemento
            console.log("selecciono editar resumen dia ",id);
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
// Funcion mostrar las tareas del dia
function mostrarResumen(){
  resumenDia.innerHTML = '';  //  Se inicializa en vacio
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
    if (fechaActual == fechaTareas[i] && estadoTareas[i] === 0) {
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
      // Check estado de la tarea
      const divCheck = document.createElement('div');
      divCheck.classList.add("form-check");
      // input 
      const inputCheck = document.createElement('input');
      inputCheck.classList.add("form-check-input");
      inputCheck.type = 'checkbox';
      inputCheck.id = `check${idTareas[i]}2`;
      // Label
      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.setAttribute('for', `check${idTareas[i]}2`);
      label.textContent = 'Tarea completada';
      // Boton editar
      const btnEditar = document.createElement('button');
      btnEditar.classList.add("btn","btn-sm","btn-primary","me-2","editarResumen");
      btnEditar.textContent = "Editar";
      btnEditar.id = `editarResumen${idTareas[i]}`;
      // Boton eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add("btn","btn-sm","btn-danger","eliminar");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.id = `eliminar${idTareas[i]}2`;

      resumenDia.appendChild(card);
      card.appendChild(cardB);
      cardB.appendChild(divT);
      divT.appendChild(titulo);
      divT.appendChild(fecha);
      fecha.appendChild(small);
      cardB.appendChild(parrafo);
      cardB.appendChild(prioridad);
      cardB.appendChild(divCheck);
      divCheck.appendChild(inputCheck);
      divCheck.appendChild(label);
      cardB.appendChild(divB);
      divB.appendChild(btnEditar);
      divB.appendChild(btnEliminar);
    }

  });
  // Eliminar tarea 
  eliminarTarea();
  // Editar resumen 
  editarResumen()
  // Marcar tarea como completa
  checkTareaCompleta();
}
// Funcion Checkear tarea completada
function checkTareaCompleta(){
  const checks = document.querySelectorAll('.form-check-input');
  checks.forEach(eleccion => {
    eleccion.addEventListener('change', ()=>{
        
      let idT = (eleccion.id);
      idTareas.forEach((id,i) => {

        if (idT === `check${id}` || idT === `check${idTareas[i]}2`) {
          estadoTareas[i] = 1;
          localStorage.setItem('arrEstadoT', JSON.stringify(estadoTareas));
          Swal.fire({
            title: 'Tarea Completada!',
            text: 'Se realizo el cambio con exito.',
            icon: 'success',
            position: 'top',
            toast: true,         // Hace que sea un mensajito como "toast"
            timer: 2000,         // Se cierra en 3 segundos
            showConfirmButton: false
          });
        }
      });
      agregarTarea();
      mostrarResumen();
    });
  });
}

function tema(){
  const html = document.documentElement;

  // Aplicar el tema guardado
  if (cambiarTema === '1') {
      html.setAttribute('data-bs-theme', 'dark');
  } else {
      html.setAttribute('data-bs-theme', 'light');
  }
}