let mascotas = [
    {
        tipo:"Gato",
        nombre: "Martín",
        dueno: "Alejandro"
    },
];

function listarMascotas(){
    let htmlMascotas = mascotas.map((mascota, indice)=>{`<tr>
            <th scope="row">${indice}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.dueno}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>`
    });
    console.log(htmlMascotas);
}

listarMascotas();