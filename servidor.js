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
        var indice = 1;
        req.on("data", function (chunk) {
            console.log('i: ' + indice++);
            body += chunk;
        });

        //O body deve ser um array de objetos json que será gravado no arquivo tarefas.json, sobrescrevendo o que tiver lá
        //Se tudo der certo, só retornar 200 - OK
        req.on("end", function(){
            fs.writeFile("./tarefas.json", body, function(err) {
                if (err) {
                    throw err;
                };
                console.log('Salvou');
            });
    
            var header = { "Content-Type": "text/html"
                         , "Access-Control-Allow-Origin": "http://localhost" 
                         , "Access-Control-Allow-Headers": "Content-Type" 
                         , "Access-Control-Allow-Methods": "GET POST PUT DELETE OPTIONS" 
        }
            res.writeHead(200, header);
            res.end();
        });
    }

    if (req.method === "DELETE") {
    
        //pegar o id da tarefa na requisi��o, buscar o objeto json correspondente no arquivo de tarefas e exluir o arquivo
    }

    if (req.method === "PUT") {
    
        //pegar o id da tarefa na requisi��o, buscar o objeto json correspondente no arquivo de tarefas e editar o objeto json no arquivo
    }

    if (req.method === "OPTIONS") {
        var header = { "Access-Control-Allow-Origin": "http://localhost" 
                        , "Access-Control-Allow-Headers": "Content-Type" 
                        , "Allow": "GET POST PUT DELETE" 
                        };
        res.writeHead(204, header);
        res.end();
    }

    

}).listen(3000);