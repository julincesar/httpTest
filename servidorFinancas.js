  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const mongoose = require('mongoose');
  const movimentoRoute = require('./movimentos.route');

  const PORT = 4000;
  const URLMONGO = 'mongodb://localhost:27017/financas';
  
  mongoose.Promise = global.Promise;
  mongoose.connect(URLMONGO, { useNewUrlParser: true }).then(
    () => {console.log('Banco de Dados conectado.') },
    err => { console.log('Não conseguiu se conectar ao banco de dados. '+ err)}
  );
  
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  
  app.use('/movimentos', movimentoRoute);
  
  app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
  });