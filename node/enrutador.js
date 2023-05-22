const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarias = require("./rutas/veterinarias");
module.exports = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'Esta es /ruta' });
    },
    mascotas: mascotas(recursos.mascotas),
    veterinarias: veterinarias(recursos.veterinarias),
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: 'No encontrado' })
    },
}