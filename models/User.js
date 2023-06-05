const Sequelize = require('sequelize');
const db = require('./db.js');

const User = db.define('usuario', {
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
    profissao: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dt_nasc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
    }
});

//O tipo de usuário é tipo 1 = personal, 2 = admin
//Criar a tabela
User.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//User.sync({ alter: true })

module.exports = User;