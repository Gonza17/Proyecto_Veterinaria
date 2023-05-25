let    consultas= [
    {
        mascota: 0, 
        veterinaria: 0, 
        fechaCreacion: new Date(),
        fechaEdicion: new Date(), 
        historia: 'historia 0', 
        diagnostico: 'diagnostico 0 '
    },
      {
        mascota: 0, 
        veterinaria: 0, 
        fechaCreacion: new Date(),
        fechaEdicion: new Date(), 
        historia: 'historia 1', 
        diagnostico: 'diagnostico 1'
    },
      {
        mascota: 0, 
        veterinaria: 0, 
        fechaCreacion: new Date(),
        fechaEdicion: new Date(), 
        historia: 'historia 2', 
        diagnostico: 'diagnostico 2'
    },  
];

consultas;
//la aplicacion del push es una mala practica dentro de la programacion en javascript.
consultas.push({
mascota: 2, 
veterinaria: 2, 
fechaCreacion: new Date(),
fechaEdicion: new Date(), 
historia: 'historia 3', 
diagnostico: 'diagnostico 3 '
});

consultas;
