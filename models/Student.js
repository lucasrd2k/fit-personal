const Sequelize = require('sequelize');
const db = require('./db.js');
// Tabela Student (Aluno) pertence a tabela User (Usuario)
const Student = db.define('aluno', {
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
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dt_nasc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto:{
        type: Sequelize.STRING,
        allowNull: true
    },
    status_pagamento: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id'
        }
    }
});
//Não precisa de belongsTo, pois o sequelize já faz isso automaticamente
//Student.belongsTo(User);
//Student.sync({ force: true });
//Não precisa de hasMany, pois o sequelize já faz isso automaticamente



//Criar a tabela
Student.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Student.sync({ alter: true })
module.exports = Student;
