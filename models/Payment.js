//Criar uma tabela pra registrar os pagamentos feitos pelos alunos
const Sequelize = require('sequelize');
const db = require('./db.js');

const Payment = db.define('Pagamento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id'
        }
    },
    aluno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'aluno',
            key: 'id'
        }
    }
});

//Criar a tabela
Payment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Payment.sync({ alter: true })

module.exports = Payment;