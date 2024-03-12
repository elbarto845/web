document.addEventListener("DOMContentLoaded", function() {
    const sala = document.getElementById("sala");
  
    // Puedes cambiar el tamaño de la sala ajustando estos valores
    const filas = 5;
    const columnas = 5;
  
    // Función para crear butacas
    function crearButacas() {
      for (let fila = 1; fila <= filas; fila++) {
        for (let columna = 1; columna <= columnas; columna++) {
          const butaca = document.createElement("div");
          butaca.classList.add("butaca");
          butaca.setAttribute("data-fila", fila);
          butaca.setAttribute("data-columna", columna);
          butaca.addEventListener("click", seleccionarButaca);
          sala.appendChild(butaca);
        }
      }
    }
  
    // Función para manejar la selección de butacas
    function seleccionarButaca(event) {
      const butacaSeleccionada = event.target;
      butacaSeleccionada.classList.toggle("selected");
  
      // Puedes guardar la selección en localStorage para que persista al recargar la página
      const seleccionActual = JSON.parse(localStorage.getItem("seleccion")) || [];
      const fila = butacaSeleccionada.getAttribute("data-fila");
      const columna = butacaSeleccionada.getAttribute("data-columna");
  
      const nuevaSeleccion = {
        fila: parseInt(fila),
        columna: parseInt(columna)
      };
  
      const index = seleccionActual.findIndex(item => item.fila === nuevaSeleccion.fila && item.columna === nuevaSeleccion.columna);
  
      if (index === -1) {
        seleccionActual.push(nuevaSeleccion);
      } else {
        seleccionActual.splice(index, 1);
      }
  
      localStorage.setItem("seleccion", JSON.stringify(seleccionActual));
    }
  
    // Función para cargar la selección almacenada en localStorage
    function cargarSeleccionGuardada() {
      const seleccionGuardada = JSON.parse(localStorage.getItem("seleccion")) || [];
  
      seleccionGuardada.forEach(seleccion => {
        const selector = `[data-fila="${seleccion.fila}"][data-columna="${seleccion.columna}"]`;
        const butaca = sala.querySelector(selector);
        if (butaca) {
          butaca.classList.add("selected");
        }
      });
    }
  
    // Inicialización
    crearButacas();
    cargarSeleccionGuardada();
  });
  