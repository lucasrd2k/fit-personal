const Sequelize = require('sequelize');
const db = require('./db.js');

const Sprint = db.define('sprint', {
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
    tempo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    inicio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fim: {
        type: Sequelize.STRING,
        allowNull: false
    },
    personal: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Criar a tabela
Sprint.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Sprint.sync({ alter: true })

module.exports = Sprint;