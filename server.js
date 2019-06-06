const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 9000;
let globalResponse = '';

let filePath = path.resolve(__dirname, 'static/index.html');
function existe(err){
    if(err){
        console.log("El archivo no existe");
    }else{
        fs.readFile(filePath, 'utf8', leer);
    }
}

function leer(err, archivo){
    if(err){
        console.log("El archivo no existe");
    }
    globalResponse.write(archivo);
    globalResponse.end();
}

function responseHandler(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    console.log(" ");
    if (request.url === '' || request.url === "/"){
        fs.access(filePath, fs.constants.F_OK, existe);

    }else if (request.url === "/about"){
        filePath = path.resolve(__dirname, 'static/about.html');
        fs.access(filePath, fs.constants.F_OK, existe);
    }
    globalResponse = response;
}

const server = http.createServer(responseHandler);


server.listen(port);