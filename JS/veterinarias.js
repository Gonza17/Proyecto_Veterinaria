const listaVeterinarios = document.getElementById("lista-veterinarios");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const dueno = document.getElementById("identificacion");
const pais = document.getElementById("pais")
const form = document.getElementById("form");
const botonGuardar = document.getElementById("guardar");
const indice = document.getElementById("indice")
const url = "http://localhost:5000/veterinarias"
let veterinarios = [];

async function listarVeterinarios() {
    try {
        const respuesta = await fetch(url);
        const veterinariosDelServer = await respuesta.json();
        if (Array.isArray(veterinariosDelServer)) {
            veterinarios = veterinariosDelServer;
        }
        if (veterinarios.length > 0) {
            const htmlVeterinarios = veterinarios.map((veterinario, index) =>
                `<tr>
                <th scope="row">${index}</th>
                <td>${veterinario.nombre}</td>
                <td>${veterinario.apellido}</td>
                <td>${veterinario.identificacion}</td>
                <td>${veterinario.pais}</td>
                <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                </div>
                </td>
                </tr>`
            ).join(" ");
            listaVeterinarios.innerHTML = htmlVeterinarios;
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
            return;
        }
        listaVeterinarios.innerHTML = `
            <tr>
                <td colspan="5" class="lista-vacia">No Hay Veterinarios</td>
            </tr>
        `
    } catch (error) {
        $(".alert").alert("show");
    }
}

async function enviarDatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            identificacion: identificacion.value,
            pais: pais.value
        };
        const accion = botonGuardar.innerHTML;
        let urlEnvio = url;
        let method = "POST";
        if (accion === "Editar") {
            method = 'PUT';
            veterinarios[indice.value] = datos;
            urlEnvio += `/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
        });
        if (respuesta.ok) {
            listarVeterinarios();
            resetModal();
        }
    } catch (error) {
        $(".alert").alert("show");
    }
}


function editar(index) {
    return function cuandoHagoClick() {
        botonGuardar.innerHTML = 'Editar'
        $('#exampleModal').modal('toggle');
        const veterinario = veterinarios[index];
        nombre.value = veterinario.nombre;
        apellido.value = veterinario.apellido;
        identificacion.value = veterinario.identificacion;
        pais.value = veterinario.pais;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = "";
    apellido.value = "";
    identificacion.value = "";
    pais.value = "";
    indice.value = "";
    botonGuardar.innerHTML = 'Crear';
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: "DELETE",
                mode: "cors",
            });
            if (respuesta.ok) {
                listarVeterinarios();
            }
        } catch (error) {
            $(".alert").alert("show");
        }
    }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
botonGuardar.onclick = enviarDatos;