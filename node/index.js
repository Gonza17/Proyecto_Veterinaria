const http = require('node:http');
const url = require('node:url');
const StringDecoder = require('string_decoder').StringDecoder;

let recursos ={
    mascotas: [
        {tipo:"Perro", nombre:"Thor", dueno:"Gonzalo"},
        {tipo:"Perro", nombre:"Paul", dueno:"Gustavo"},
        {tipo:"Gato", nombre:"Martín", dueno:"Alejandro"}
    ]
}

const callbackDelServidor = (req, res) => {
    // obtener url desde el objeto request
    const urlActual = req.url;
    // obtener la ruta
    const urlParseada = url.parse(urlActual, true);
    const ruta = urlParseada.pathname;
    // limpiar la ruta de los slash "/"
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, "");
    // obtener el metodo http
    const metodo = req.method.toLowerCase();
    // obtener las variables del query
    const { query = {} } = urlParseada;
    console.log({ query });
    // obtener headers.
    const { headers = {} } = req;
    console.log({ headers });
    // obtener payload, en el caso de haber alguno.
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
  
    // ir acumulando la data cuendo el request reciba un payload
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    // terminar de acumular datos y decirle al decoder que finalece.
    req.on('end', () => {
        buffer += decoder.end();
        if(headers["content-type"] === 'application/json'){
            buffer = JSON.parse(buffer);
        }

        // revisar si tiene subrutas en este caso es el indice del array
        if(rutaLimpia.indexOf("/") > -1){
            var [rutaPrincipal, indice] = rutaLimpia.split('/');

        }

        // ordenar la data
        const data = {
            indice ,
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };


        console.log({ data });

        // elegir el manejador de la respuesta.//handler.
        let handler;
        if (rutaPrincipal && 
            enrutador[rutaPrincipal] && 
            enrutador[rutaPrincipal][metodo]) {
            handler = enrutador[rutaPrincipal ][metodo];
        } else {
            handler = enrutador.noEncontrado;
        }

        // ejecutar handler para enviar la respuesta.
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('content-type', "application/json");
                res.writeHead(statusCode);

                //linea donde realmente ya estamos dando la respuesta a la aplicación cliente.
                res.end(respuesta);
            });
        }
    });
    /*if(rutaLimpia === 'ruta'){
        res.end('estas en la ruta: /ruta');
    }else{
        res.end('estas en una ruta que no conzco');
    }
    */
};

const enrutador = {
    ruta: (data, callback) => {
        callback(200, { mensaje: 'Esta es /ruta' });
    },    
    mascotas:{

        get: (data, callback) => {
            if(data.indice){
                if(recursos.mascotas[indice]){
                    
                }
                callback(200, recursos);
            }
            callback(200, recursos.mascotas);    
        },
        post: (data, callback) => {
            console.log("handler: ",{data});
            recursos.mascotas.push(data.payload);
            callback(201, data.payload);    
        },
        
    } ,
    noEncontrado: (data, callback) => {
        callback(404, { mensaje: 'No encontrado' })
    },
}

const server = http.createServer(callbackDelServidor);

server.listen(5000, () => {
    console.log('el servidor esta escuchando peticiones en la url localhost:5000');
});