document.getElementById('todayDate').textContent = new Date().toLocaleDateString(); // Sacar fecha local;

// Funcion para guardar datos del modal
function guardarDatos() {
    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    
    console.log("Título:", titulo);
    console.log("Descripción:", descripcion);

    // Cerrar el modal manualmente
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalFormulario'));
    modal.hide();
  }