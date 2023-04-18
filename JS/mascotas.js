const listaMascotas = document.getElementById("lista-mascotas");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const form = document.getElementById("form");
const botonGuardar = document.getElementById("guardar");
const indice = document.getElementById("indice")

let mascotas = [
    {
        tipo:"Gato",
        nombre: "Martín",
        dueno: "Alejandro"
    },
    {  
        tipo: "Perro",
        nombre: "Paul",
        dueno: "Gustavo"
    },
    {
        tipo: "Perro",
        nombre: "Thor",
        dueno: "Gonzalo"
    }
];

function listarMascotas (){
    const htmlMascotas = mascotas.map((mascota, index)=>
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
    </tr>`
    ).join(" ")
    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento){
    evento.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value
    };
    const accion = botonGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            mascotas[indice.value] = datos;
            break;
        default: 
            mascotas.push(datos);
            break
    }   
    listarMascotas();
    resetModal();
}

function editar(index){
    botonGuardar.innerHTML = 'Editar'
    $('#exampleModal').modal('toggle');
    return function cuandoHagoClick(){
        const mascota = mascotas[index];
        tipo.value = mascota.tipo;
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        indice.value = index;
    }
}

function resetModal(){
    tipo.value = "";
    nombre.value = "";
    dueno.value = "";
    indice.value = "";
    botonGuardar.innerHTML = 'Crear';
}

function eliminar(index){
    return function (clickEnEliminar){
        console.log('index',index);
        mascotas = mascotas.filter((mascota, indiceMascota) =>indiceMascota !== index);
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
botonGuardar.onclick = enviarDatos;