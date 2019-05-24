var http = require('http');
var fs = require('fs');

var tarefas = [];

var server = http.createServer(function (req, res) {

    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        fs.createReadStream("./tarefas.json", "UTF-8").pipe(res);
    } 
    
    if (req.method === "POST") {
    
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });

        //O body deve ser um objeto json que ser� adicionado ao array contido no arquivo tarefas.json
        //Se tudo der certo, s� retornar 200 - OK

        //req.on("end", function(){
        //    res.writeHead(200, { "Content-Type": "text/html" });
        //    res.end(body);
        //});
    }

    if (req.method === "DELETE") {
    
        //pegar o id da tarefa na requisi��o, buscar o objeto json correspondente no arquivo de tarefas e exluir o arquivo
    }

    if (req.method === "PUT") {
    
        //pegar o id da tarefa na requisi��o, buscar o objeto json correspondente no arquivo de tarefas e editar o objeto json no arquivo
    }

    

}).listen(3000);