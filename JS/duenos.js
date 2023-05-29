const listaDuenos = document.getElementById("lista-duenos");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const identifiacion = document.getElementById("identificacion");
const form = document.getElementById("form");
const botonGuardar = document.getElementById("guardar");
const indice = document.getElementById("indice");
const url = 'http://localhost:5000/duenos'
let duenos = [];

async function listarDuenos() {
    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
        if (Array.isArray(duenosDelServer)) {
            duenos = duenosDelServer;
        }
        if (duenos.length > 0) {
            const htmlDuenos = duenos.map((dueno, index) =>
                `<tr>
                <th scope="row">${index}</th>
                <td>${dueno.nombre}</td>
                <td>${dueno.apellido}</td>
                <td>${dueno.identificacion}</td>                
                <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                </div>
                </td>
                </tr>`
            ).join(" ");
            listaDuenos.innerHTML = htmlDuenos;
            Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
            return;
        }
        listaDuenos.innerHTML = `
            <tr>
                <td colspan="5" class="lista-vacia">No Hay Dueños</td>
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
        };
        const accion = botonGuardar.innerHTML;
        let urlEnvio = url;
        let method = "POST";
        if (accion === "Editar") {
            method = 'PUT';
            duenos[indice.value] = datos;
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
            listarDuenos();
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
        const dueno = duenos[index];
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        identificacion.value = dueno.identificacion;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = "";
    apellido.value = "";
    identificacion.value = "";
    indice.value = "";
    botonGuardar.innerHTML = 'Crear';
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`
    return async function clickEnEliminar() {
        try {
            const respuesta = await fetch(urlEnvio, {
                method: "DELETE",
                mode: "cors",
            });
            if (respuesta.ok) {
                listarDuenos();
            }
        } catch (error) {
            $(".alert").alert("show");
        }
    }
}

listarDuenos();

form.onsubmit = enviarDatos;
botonGuardar.onclick = enviarDatos;