const http = require('node:http');
const requestHandler = require('./request-handler');

const server = http.createServer(requestHandler);

server.listen(5000, () => {
    console.log('el servidor esta escuchando peticiones en la url localhost:6000');
});