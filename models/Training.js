const Sequelize = require('sequelize');
const db = require('./db.js');

const Training = db.define('Treino', {
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
    data : {
        type: Sequelize.DATE,
        allowNull: false
    },
    sprintId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Criar a tabela
Training.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
// Training.sync({ alter: true });

module.exports = Training;