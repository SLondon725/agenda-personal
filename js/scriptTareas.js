// Recuperar los arrays del localStorage
let titulosTareas = JSON.parse(localStorage.getItem('arrTitulosT')) || [];
let descripcionTareas = JSON.parse(localStorage.getItem('arrDescripcionT')) || [];
let fechaTareas = JSON.parse(localStorage.getItem('arrFechaT')) || [];
let prioridadTareas = JSON.parse(localStorage.getItem('arrPrioridadT')) || [];
let idTareas = JSON.parse(localStorage.getItem('arrIdT')) || [];
let estadoTareas = JSON.parse(localStorage.getItem('arrEstadoT')) || [];

// localStorage.clear();
// Constantes
const tareasP = document.getElementById('tareasP'); //  Div para guardar las tareas pendientes
const tareasC = document.getElementById('tareasC'); //  Div para guardar las tareas completadas
const modal = document.getElementById('modalFormulario'); // Modal del nuevo registro
const btnGuardar = document.getElementById('guardar');  // Guardar o actualizar registro
const filtroPrioridad = document.getElementById('filtroPrioridad'); // Filtro de prioridad
// Cambiar a tema oscuro
const cambiarTema = localStorage.getItem('cambiarTema') || '0';

// Variable para saber si se esta editando
let indiceEdicion = null;
let nuevaPrioridad = "-1";
// Funciones a ejecutar al ingresar a la pagina
agregarTarea(); // actualizar datos de las tareas
tema();

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
    localStorage.setItem('arrEstadoT', JSON.stringify(estadoTareas));


    agregarTarea();
  }
})

function agregarTarea(){
  console.log(nuevaPrioridad);  // Verificando el valor de nuevaPrioridad
  tareasP.innerHTML = '';  //  Se inicializa en vacio
  tareasC.innerHTML = '';  //  Se inicializa en vacio

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
    if (nuevaPrioridad === '-1') {

      if (estadoTareas[i] === 0) {
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
        btnEditar.classList.add("btn","btn-sm","btn-primary","me-2","editar");
        btnEditar.textContent = "Editar";
        btnEditar.id = `editar${idTareas[i]}`;

        // Boton eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add("btn","btn-sm","btn-danger","eliminar");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.id = `eliminar${idTareas[i]}`;

        tareasP.appendChild(card);
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
      }else{
         // Carta
        const card = document.createElement('div');
        card.classList.add("card", "col-12", "mb-3");
        card.style.borderLeft = `0.5rem solid ${color}`;
        if (estadoTareas[i] === 1) {
          card.style.opacity = "0.6";
        }
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
        inputCheck.checked = estadoTareas[i] === 1; 
        // Label
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', `check${idTareas[i]}`);
        label.textContent = 'Tarea completada';
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

        tareasC.appendChild(card);
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
     
    }else if (nuevaPrioridad === prioridadTareas[i] && estadoTareas[i] === 0) {
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
      btnEditar.classList.add("btn","btn-sm","btn-primary","me-2","editar");
      btnEditar.textContent = "Editar";
      btnEditar.id = `editar${idTareas[i]}`;

      // Boton eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add("btn","btn-sm","btn-danger","eliminar");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.id = `eliminar${idTareas[i]}`;

      tareasP.appendChild(card);
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

function eliminarTarea(){
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
              }
            })
          }
        });
    });
  });
  
}
// Funcion editar tarea
function editarTarea(){
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
// Funcion Checkear tarea completada
function checkTareaCompleta(){
  const checks = document.querySelectorAll('.form-check-input');
  checks.forEach(eleccion => {
    eleccion.addEventListener('change', (e)=>{
        
      let idT = (eleccion.id);
      idTareas.forEach((id,i) => {

        if (idT === `check${id}`) {
          estadoTareas[i] = e.target.checked ? 1 : 0;
          localStorage.setItem('arrEstadoT', JSON.stringify(estadoTareas));
          if (estadoTareas[i] === 1) {   
            Swal.fire({
              title: 'Tarea Completada!',
              text: 'Se realizo el cambio con exito.',
              icon: 'success',
              position: 'top',
              toast: true,         // Hace que sea un mensajito como "toast"
              timer: 2000,         // Se cierra en 3 segundos
              showConfirmButton: false
            });
          }else{
            Swal.fire({
              title: 'Tarea Incompleta!',
              text: 'Se realizo el cambio con exito.',
              icon: 'warning',
              position: 'top',
              toast: true,         // Hace que sea un mensajito como "toast"
              timer: 2000,         // Se cierra en 3 segundos
              showConfirmButton: false
            });
          }
        }
      });
      agregarTarea();
    });
  });
}


// Evento para cambiar de color
filtroPrioridad.addEventListener('change',actualizarPrioridad)

function actualizarPrioridad(){
  nuevaPrioridad = filtroPrioridad.value ;
  agregarTarea()
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


