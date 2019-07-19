const express = require('express');
const movimentoRoutes = express.Router();

let Movimentos = require('./movimentos.model');

// Rota para adição de novo movimento
movimentoRoutes.route('/add').post(function (req, res) {
  let movimento = new Movimentos(req.body);
  movimento.save()
    .then(movimento => {
      res.status(200).json({ 'movimento': 'movimento adicionado com sucesso.' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("movimento: impossível salvar no Mongo.");
    });
});

// Definido o get para buscar os dados(index ou listing) route
movimentoRoutes.route('/').get(function (req, res) {
  Movimentos.find(function (err, movimentos) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(movimentos);
    }
  });
});

// Definindo rota de edição
movimentoRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Movimentos.findById(id, function (err, movimento) {
    res.json(movimento);
  });
});

//  Rota de atualização
movimentoRoutes.route('/update/:id').put(function (req, res) {
  Movimentos.findById(req.params.id, function (err, movimento) {
    if (!movimento)
      res.status(404).send("Dados não encontrados.");
    else {
      movimento.descricao = req.body.descricao;
      movimento.parcela = req.body.parcela;
      movimento.id_movimento = req.body.id_movimento;
      movimento.categoria = req.body.categoria;
      movimento.cartao = req.body.cartao;
      movimento.data_compra = req.body.data_compra;
      movimento.data_vencimento = req.body.data_vencimento;
      movimento.cidade = req.body.cidade;
      movimento.valor = req.body.valor;

      movimento.save().then(movimento => {
        res.json('Atualização completa.');
      })
        .catch(err => {
          res.status(400).send("Não foi possível atualizar o banco de dados.");
        });
    }
  });
});

// Definindo a exclusão.
movimentoRoutes.route('/delete/:id').delete(function (req, res) {
  Movimentos.findByIdAndRemove({ _id: req.params.id }, function (err, movimento) {
    if (err) res.json(err);
    else res.json('Removido com sucesso.');
  });
});

module.exports = movimentoRoutes;