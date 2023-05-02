const http = require('node:http');
const enrutador = require('./enrutador');
const requestHandler = require('./request-handler');


global.recursos = {
    mascotas: [
        { tipo: "Perro", nombre: "Thor", dueno: "Gonzalo" },
        { tipo: "Perro", nombre: "Paul", dueno: "Gustavo" },
        { tipo: "Gato", nombre: "Martín", dueno: "Alejandro" }
    ]
}

const server = http.createServer(requestHandler);

server.listen(5000, () => {
    console.log('el servidor esta escuchando peticiones en la url localhost:5000');
});