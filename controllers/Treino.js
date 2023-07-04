//Aqui vamos criar e exportar as rotas da classe Treino

const express = require('express');
const router = express.Router();
const Treino = require('../models/Training');
const Exercicio = require('../models/Exercise');
const { verifyJWTAluno, verifyJWTPersonal } = require('./verify');
//Estrutura do treino
// nome
// descricao
// data
// sprintId

//Criar treino
router.post('/treino', verifyJWTPersonal, async (req, res) => {
    const { nome, descricao, data, sprintId } = req.body;
    if (!nome || !descricao || !data || !sprintId) {
        return res.status(400).send({ erro: false, mensagem: 'Dados insuficientes!' });
    }
    try{
        const sprint = await Sprint.findOne({ where: { id: sprintId } });
        if (!sprint) {
            return res.status(400).send({ erro: false, mensagem: 'Sprint não encontrado' });
        }
        if (sprint.personal != req.userId) {
            return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
        }
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
    try {
        const treino = await Treino.create({ nome, descricao, data, sprintId });
        const response = {
            erro: false,
            mensagem: 'Treino criado com sucesso!',
            treino
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
});

//Editar treino
router.put('/treino/:treinoId', verifyJWTPersonal, async (req, res) => {
    const { nome, descricao, data, sprintId } = req.body;
    const { treinoId } = req.params;
    if (!nome && !descricao && !data && !sprintId && !personal) {
        return res.status(400).send({ erro: false, mensagem: 'Dados insuficientes!' });
    }
    try {
        const treino = await Treino.findOne({ where: { id: treinoId } });
        if (!treino) {
            return res.status(400).send({ erro: false, mensagem: 'Treino não encontrado' });
        }
        if (treino.personal != req.userId) {
            return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
        }

        if (nome) {
            treino.nome = nome;
        }
        if (descricao) {
            treino.descricao = descricao;
        }
        if (data) {
            treino.data = data;
        }
        if (sprintId) {
            treino.sprintId = sprintId;
        }
        await treino.save();
        const response = {
            erro: false,
            mensagem: 'Treino editado com sucesso!',
            treino
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
});


//Deletar treino
router.delete('/treino/:treinoId', verifyJWTPersonal, async (req, res) => {
    const { treinoId } = req.params;
    try {
        const treino = await Treino.findOne({ where: { id: treinoId } });
        if (!treino) {
            return res.status(400).send({ erro: false, mensagem: 'Treino não encontrado' });
        }
        if (treino.personal != req.userId) {
            return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
        }
        await treino.destroy();
        const response = {
            erro: false,
            mensagem: 'Treino deletado com sucesso!'
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha ao deletar' });
    }
});

//Listar treinos (personal)
router.get('/treino', verifyJWTPersonal, async (req, res) => {
    try {
        const treinos = await Treino.findAll({ where: { personal: req.userId } });
        const response = {
            erro: false,
            treinos
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha ao listar' });
    }
});

//Listar treinos (aluno)
router.get('/treino/:personalId', verifyJWTAluno, async (req, res) => {
    const { personalId } = req.params;
    try {
        const treinos = await Treino.findAll({ where: { personal: personalId } });
        const response = {
            erro: false,
            treinos
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha ao listar' });
    }
});


    