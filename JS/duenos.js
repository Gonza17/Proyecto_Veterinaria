const listaDuenos = document.getElementById("lista-duenos");
const tipo = document.getElementById("nombre");
const nombre = document.getElementById("apellido");
const dueno = document.getElementById("identificacion");
const pais = document.getElementById("pais")
const form = document.getElementById("form");
const botonGuardar = document.getElementById("guardar");
const indice = document.getElementById("indice");

let duenos = [
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

function listarDuenos (){
    const htmlDuenos = duenos.map((dueno, index)=>
    `<tr>
    <th scope="row">${index}</th>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td>${dueno.identificacion}</td>
    <td>${dueno.pais}</td>
    <td>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
    </div>
    </td>
    </tr>`
    ).join(" ");
    listaDuenos.innerHTML = htmlDuenos;
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
            duenos[indice.value] = datos;
            break;
        default: 
            duenos.push(datos);
            break
    }   
    listarVeterinarios();
    resetModal();
}

function editar(index){
    return function cuandoHagoClick(){
        botonGuardar.innerHTML = 'Editar'
        $('#exampleModal').modal('toggle');
        const dueno = duenos[index];
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        identificacion.value = dueno.identificacion;
        pais.value = dueno.pais;
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
        dueno = duenos.filter((dueno, indiceDueno) =>indiceDueno !== index);
        listarDuenos();
    }
}

listarDuenos();

form.onsubmit = enviarDatos;
botonGuardar.onclick = enviarDatos;