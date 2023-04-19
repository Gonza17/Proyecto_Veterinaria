const listaVeterinarios = document.getElementById("lista-veterinarios");
const tipo = document.getElementById("nombre");
const nombre = document.getElementById("apellido");
const dueno = document.getElementById("identificacion");
const pais = document.getElementById("pais")
const form = document.getElementById("form");
const botonGuardar = document.getElementById("guardar");
const indice = document.getElementById("indice")

let veterinarios = [
    {
        nombre:"Gonzalo",
        apellido: "Jaques",
        identificacion: "11122255-6",
        pais: "Chile"
    },
    {  
        nombre:"Gustavo",
        apellido: "Jaques",
        identificacion: "11122255-6",
        pais: "Chile"
    },
    {
        nombre:"Oriana",
        apellido: "Fuentes",
        identificacion: "11122255-6",
        pais: "Chile"
    }
];

function listarVeterinarios (){
    const htmlVeterinarios = veterinarios.map((veterinario, index)=>
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
    ).join(" ")
    listaVeterinarios.innerHTML = htmlVeterinarios;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento){
    evento.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value,
        pais: pais.value
    };
    const accion = botonGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            veterinarios[indice.value] = datos;
            break;
        default: 
            veterinarios.push(datos);
            break
    }   
    listarVeterinarios();
    resetModal();
}

function editar(index){
    botonGuardar.innerHTML = 'Editar'
    $('#exampleModal').modal('toggle');
    return function cuandoHagoClick(){
        const veterinario = veterinarios[index];
        nombre.value = veterinario.nombre;
        apellido.value = veterinario.apellido;
        identificacion.value = veterinario.identificacion;
        pais.value = veterinario.pais;
        indice.value = index;
    }
}

function resetModal(){
    nombre.value = "";
    apellido.value = "";
    identificacion.value = "";
    pais.value = "";
    indice.value = "";
    botonGuardar.innerHTML = 'Crear';
}

function eliminar(index){
    return function (clickEnEliminar){
        veterinario = veterinarios.filter((mascota, indiceMascota) =>indiceMascota !== index);
        listarVeterinarios();
    }
}

listarVeterinarios();

form.onsubmit = enviarDatos;
botonGuardar.onclick = enviarDatos;