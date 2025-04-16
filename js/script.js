document.getElementById('todayDate').textContent = new Date().toLocaleDateString(); // Sacar fecha local
const hoy = new Date().toISOString().split('T')[0]; // Sacar la fecha local en formato ingles
const modal = document.getElementById('modalFormulario'); // Modal del nuevo registro
const btnGuardar = document.getElementById('guardar');  // Guardar nuevo registro

// evento para reiniciar el modal 
modal.addEventListener('hidden.bs.modal',()=> { document.getElementById('formModal').reset();  });

btnGuardar.addEventListener('click',()=>{
  // Trayendo los valores del nuevo registro
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const fecha = document.getElementById("fecha").value;
  const prioridad = document.getElementById("prioridad").value;

  // Validando si faltan datos
  if (titulo === "" || descripcion === "" || fecha === "") {
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
    console.log("Título:", titulo);
    console.log("Descripción:", descripcion);
    console.log("Fecha:", fecha);
    console.log("Prioridad:", prioridad);
    Swal.fire({
      title: '¡Nuevo registro!',
      text: 'Tu tarea se registro de forma correcta',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
})