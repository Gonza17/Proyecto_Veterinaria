const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const form = document.getElementById("form");
const botonGuardar = document.getElementById("guardar");
const indice = document.getElementById("indice");
const url = "http://localhost:5000/mascotas";

let mascotas = [];

async function listarMascotas() {
    try {
        const respuesta = await fetch(url)
        const mascotasDelServer = await respuesta.json();
        /*.then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.json();
        }
    }).then((mascotasDelServer) => {
        mascotas = mascotasDelServer;
    });*/
        if (Array.isArray(mascotasDelServer)) {
            mascotas = mascotasDelServer;
        }
        if(mascotas.length > 0){
            const htmlMascotas = mascotas.map((mascota, index) =>
            `<tr>
            <th scope="row">${index}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.dueno}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                </div>
            </td>
            </tr>`).join(" ");
        listaMascotas.innerHTML = htmlMascotas;
        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index) => botonEditar.onclick = editar(index));
        Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index) => botonEliminar.onclick = eliminar(index));
        return;
        }   
        listaMascotas.innerHTML = `
        <tr>
            <td colspan="5">No Hay Mascotas</td>
        </tr>`;     
    } catch (error) {
        $(".alert").alert("show");
    }
}

async function enviarDatos(evento) {
    evento.preventDefault();
    try {
        const datos = {
            tipo: tipo.value,
            nombre: nombre.value,
            dueno: dueno.value
        };
        let method = 'POST';
        let urlEnvio = url;
        const accion = botonGuardar.innerHTML;
        if (accion === "Editar") {
            method = 'PUT';
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
            method, // or 'PUT'
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),// data can be `string` or {object}!
        });
        if (respuesta.ok) {
            listarMascotas();
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
        const mascota = mascotas[index];
        tipo.value = mascota.tipo;
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        indice.value = index;
    }
}

function resetModal() {
    tipo.value = "";
    nombre.value = "";
    dueno.value = "";
    indice.value = "";
    botonGuardar.innerHTML = 'Crear';
}

function eliminar(index) {
    const urlEnvio = `${url}/${index}`;
    return async function (clickEnEliminar) {
        try {

            const respuesta = await fetch(urlEnvio, {
                method: 'DELETE', // or 'PUT'
            // data can be `string` or {object}!
            });
            if (respuesta.ok) {
                listarMascotas();
                resetModal();
            }
        } catch (error) {
            $(".alert").alert("show");
        }
    }
}

listarMascotas();



form.onsubmit = enviarDatos;
botonGuardar.onclick = enviarDatos;