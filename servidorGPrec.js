var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb://localhost:27017/gprec";

MongoClient.connect(uri, (err, client) => {
    if (err) {
        return console.log(err);
    } 
    db = client.db('gprec');

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
	
function findCollection(colecao, callback){  
    db.collection(colecao).find({}).toArray(callback);
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/gprec/rest/precatorio/entes/34028316001851', function (req, res) {

    findCollection("entes", (e, entes) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(entes));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(entes));
    })
})

app.get('/gprec/rest/precatorio/lista/34028316001851', function (req, res) {

    findCollection("lista", (e, colecao) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(colecao));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(colecao));
    })
})

app.get('/gprec/rest/requisicaopagamento/devedores', function (req, res) {

    findCollection("devedoresfederal", (e, colecao) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(colecao));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(colecao));
    })
})

app.get('/gprec/rest/requisicaopagamento/situacoes', function (req, res) {

    findCollection("situacao", (e, colecao) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(colecao));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(colecao));
    })
})

app.get('/gprec/rest/requisicaopagamento/varas', function (req, res) {

    findCollection("varas", (e, colecao) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(colecao));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(colecao));
    })
})

app.get('/gprec/rest/rpvfederal/lista/34028316001851', function (req, res) {

    findCollection("rpvfederal", (e, colecao) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(colecao));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(colecao));
    })
})

app.get('/gprec/rest/rpv/lista', function (req, res) {

    findCollection("rpvlista", (e, colecao) => {
        if(e) 
        { 
            return console.log(e); 
        }
        console.log(JSON.stringify(colecao));
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost" });
        res.end(JSON.stringify(colecao));
    })
})

// app.post('/tarefas', function (req, res) {
//     var body = "";
//     var indice = 1;
//     req.on("data", function (chunk) {
//         console.log('i: ' + indice++);
//         body += chunk;
//     });
//     //O body deve ser um array de objetos json que será gravado no arquivo tarefas.json, sobrescrevendo o que tiver lá
//     //Se tudo der certo, só retornar 200 - OK
//     req.on("end", function(){
//         fs.writeFile("./tarefas.json", body, function(err) {
//             if (err) {
//                 throw err;
//             };
//             console.log('Salvou');
//         });
//         var header = { "Content-Type": "text/html"
//                      , "Access-Control-Allow-Origin": "http://localhost" 
//                      , "Access-Control-Allow-Headers": "Content-Type" 
//                      , "Access-Control-Allow-Methods": "GET POST PUT DELETE OPTIONS" 
//     }
//         res.writeHead(200, header);
//         res.end();
//     });
// })

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
  