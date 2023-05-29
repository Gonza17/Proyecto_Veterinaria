module.exports = {
    mascotas: [
        { tipo: "Perro", nombre: "Thor", dueno: "Gonzalo" },
        { tipo: "Perro", nombre: "Paul", dueno: "Gustavo" },
        { tipo: "Gato", nombre: "Martín", dueno: "Alejandro" },
        { tipo: "Gato", nombre: "Trinity", dueno: "Vicente" },
    ],
    veterinarias: [
        { nombre: "Alexandra", apellido: "Perez", identificacion: "222333455543", pais: "Chile" },
        { nombre: "Alexander", apellido: "Gómez", identificacion: "839874191928", pais: "Chile" },
        { nombre: "Maricel", apellido: "Gonzalez", identificacion: "123712938712", pais: "Chile" },
        { nombre: "Celicia", apellido: "Rocco", identificacion: "12398271398123", pais: "Chile" },
    ],
    duenos: [
        { nombre: "Alejandra", apellido: "Hernandez", identificacion: "222333455543" },
        { nombre: "Alejandro", apellido: "Martinez", identificacion: "839874191928" },
        { nombre: "Leonel", apellido: "Messi", identificacion: "123712938712" },
        { nombre: "Cristiano", apellido: "Rolando", identificacion: "12398271398123" },
    ],
    consultas: [
        {
            mascota: 0,
            veterinaria: 0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: '',
            diagnostico: ''
        },
    ],
};