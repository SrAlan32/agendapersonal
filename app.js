var URL = "http://www.raydelto.org/agenda.php";

function cargarContactos() {
  fetch(URL)
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(datos) {
      var tbody = document.getElementById("tbody");
      tbody.innerHTML = "";

      for (var i = 0; i < datos.length; i++) {
        var fila = "<tr>";
        fila += "<td>" + datos[i].nombre + "</td>";
        fila += "<td>" + datos[i].apellido + "</td>";
        fila += "<td>" + datos[i].telefono + "</td>";
        fila += "</tr>";
        tbody.innerHTML += fila;
      }
    });
}

function agregarContacto() {
  var nombre   = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var telefono = document.getElementById("telefono").value;

  if (nombre == "" || apellido == "" || telefono == "") {
    alert("Por favor completa todos los campos");
    return;
  }

  var contacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono
  };

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contacto)
  })
  .then(function() {
    document.getElementById("nombre").value   = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("mensaje").innerText = "Contacto agregado!";
    cargarContactos();
  });
}

cargarContactos();