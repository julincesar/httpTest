var express = require('express');
var app = express();
var fs = require('fs');

var tarefas = [];

app.use(express.static('public'));
app.get('/tarefas', function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
    fs.createReadStream("./tarefas.json", "UTF-8").pipe(res);
})

app.post('/tarefas', function (req, res) {
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
})

// app.options('/*', function(req, res) {
//     var header = { "Access-Control-Allow-Origin": "http://localhost" 
//     , "Access-Control-Allow-Headers": "Content-Type" 
//     , "Allow": "GET POST PUT DELETE" 
//     };
//     res.writeHead(204, header);
//     res.end();
// })

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });
  

var server = app.listen(3000, function () {
})