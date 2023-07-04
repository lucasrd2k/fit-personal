const Sequelize = require('sequelize');
const db = require('./db.js');

const Exercise = db.define('Exercicio', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    series: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    repeticoes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    video: {
        type: Sequelize.STRING,
        allowNull: false
    },
    personal: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Criar a tabela
Exercise.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
// Exercise.sync({ alter: true });

module.exports = Exercise;