//Importar express pra criar as rotas com router
const express = require('express');
const router = express.Router();
//Importar o model Sprint
const Sprint = require('../models/Sprint');
const User = require('../models/User');

const { verifyJWTAluno, verifyJWTPersonal } = require('./verify');

//Aqui vamos criar e exportar as rotas da classe Sprint
router.post('/sprint', verifyJWTPersonal, async (req, res) => {
    // nome, descricao, tempo, inicio, fim ,personal
    const { nome, descricao, tempo, inicio, fim, personal } = req.body;
    if (!nome || !descricao || !tempo || !inicio || !fim || !personal) {
        return res.status(400).send({ erro: false, mensagem: 'Dados insuficientes!' });
    }
    if (personal != req.userId) {
        try {
            const user = await User.findOne({ where: { id: personal } });
            if (!user) {
                return res.status(400).send({ erro: false, mensagem: 'Personal não encontrado' });
            }
        }
        catch (err) {
            return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
        }
        try {
            const sprint = await Sprint.create({ nome, descricao, tempo, inicio, fim, personal });
            const response = {
                erro: false,
                mensagem: 'Sprint criada com sucesso!',
                sprintCriada: {
                    id: sprint.id,
                    nome: sprint.nome,
                    descricao: sprint.descricao,
                    tempo: sprint.tempo,
                    inicio: sprint.inicio,
                    fim: sprint.fim,
                    personal: sprint.personal
                }
            };
            return res.send({ response });
        }
        catch (err) {
            return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
        }
    }
    else {
        return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
    }
});

//Editar sprint

router.put('/sprint/:sprintId', verifyJWTPersonal, async (req, res) => {
    const { nome, descricao, tempo, inicio, fim } = req.body;
    const { sprintId } = req.params;
    let personal;
    if (!nome && !descricao && !tempo && !inicio && !fim && !personal) {
        return res.status(400).send({ erro: false, mensagem: 'Dados insuficientes!' });
    }
    //Verificar se o personal existe
    try {
        const user = await User.findOne({ where: { id: personal } });
        if (!user) {
            return res.status(400).send({ erro: false, mensagem: 'Personal não encontrado' });
        }
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
    //Verificar se a sprint existe
    try {
        const sprint = await Sprint.findOne({ where: { id: sprintId } });
        if (!sprint) {
            return res.status(400).send({ erro: false, mensagem: 'Sprint não encontrada' });
        }
        personal = sprint.personal;
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
    //Editar sprint
    if (personal != req.userId) {
        try {
            //Verificar quais campos foram alterados
            if (nome) {
                await Sprint.update({ nome }, { where: { id: sprintId } });
            }
            if (descricao) {
                await Sprint.update({ descricao }, { where: { id: sprintId } });
            }
            if (tempo) {
                await Sprint.update({ tempo }, { where: { id: sprintId } });
            }
            if (inicio) {
                await Sprint.update({ inicio }, { where: { id: sprintId } });
            }
            if (fim) {
                await Sprint.update({ fim }, { where: { id: sprintId } });
            }


        }
        catch (err) {
            return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
        }
        try {
            const sprint = await Sprint.findOne({ where: { id: sprintId } });
            const response = {
                erro: false,
                mensagem: 'Sprint editada com sucesso!',
                sprintEditada: {
                    id: sprint.id,
                    nome: sprint.nome,
                    descricao: sprint.descricao,
                    tempo: sprint.tempo,
                    inicio: sprint.inicio,
                    fim: sprint.fim,
                    personal: sprint.personal
                }
            };
            return res.send({ response });
        }
        catch (err) {
            return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
        }
    }
    else {
        return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
    }
});

//Deletar sprint

router.delete('/sprint/:sprintId', verifyJWTPersonal, async (req, res) => {
    const { sprintId } = req.params;
    let personal;
    //Verificar se a sprint existe
    try {
        const sprint = await Sprint.findOne({ where: { id: sprintId } });
        if (!sprint) {
            return res.status(400).send({ erro: false, mensagem: 'Sprint não encontrada' });
        }
        personal = sprint.personal;
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
    if (personal != req.userId) {
        try {
            await Sprint.destroy({ where: { id: sprintId } });
            const response = {
                erro: false,
                mensagem: 'Sprint deletada com sucesso!',
            };
            return res.send({ response });
        }
        catch (err) {
            return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
        }
    }
    else {
        return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
    }
});

//Listar sprints
router.get('/sprint', verifyJWTPersonal, async (req, res) => {
    try {
        const sprints = await Sprint.findAll({ where: { personal: req.userId } });
        const response = {
            erro: false,
            sprints
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
});

//Listar sprints de um personal
router.get('/sprint/:personalId', verifyJWTAluno, async (req, res) => {
    const { personalId } = req.params;
    try {
        const sprints = await Sprint.findAll({ where: { personal: personalId } });
        const response = {
            erro: false,
            sprints
        };
        return res.send({ response });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha no registro' });
    }
});

module.exports = router;