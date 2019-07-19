const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Movimentos
let Movimentos = new Schema({

    descricao: {type: String},
    parcela: {type: String},
    id_movimento: {type: Number},
    categoria: {type: String},
    cartao: {type: String},
    data_compra: {type: String},
    data_vencimento: {type: String},
    cidade: {type: String},
    valor: {type: Number}
},{
    collection: 'movimentos'
});

module.exports = mongoose.model('Movimentos', Movimentos);