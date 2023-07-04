//Exportar o modulo express pra routear
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const { verifyJWTAluno, verifyJWTPersonal } = require('./verify');
//Estrutura Exercicio
// nome
// descricao
// series
// repeticoes
// video
// personal

// //Criar exercicio
router.post('/exercicio', verifyJWTPersonal, async (req, res) => {
    const { nome, descricao, series, repeticoes, video, personal } = req.body;
    if (!nome || !descricao || !series || !repeticoes || !video || !personal) {
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
            const exercicio = await Exercise.create({ nome, descricao, series, repeticoes, video, personal });
            const response = {
                erro: false,
                mensagem: 'Exercício criado com sucesso!',
                exercicio
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

//Editar exercicio
router.put('/exercicio/:exercicioId', verifyJWTPersonal, async (req, res) => {
    const { nome, descricao, series, repeticoes, video } = req.body;
    const { exercicioId } = req.params;
    let personal;
    if (!nome && !descricao && !series && !repeticoes && !video && !personal) {
        return res.status(400).send({ erro: false, mensagem: 'Dados insuficientes!' });
    }
    if (personal != req.userId) {
        try {
            const exercicio = await Exercise.findOne({ where: { id: exercicioId } });
            if (!exercicio) {
                return res.status(400).send({ erro: false, mensagem: 'Exercicio não encontrado' });
            }
            if (exercicio.personal != req.userId) {
                return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
            }
            if (nome) {
                exercicio.nome = nome;
            }
            if (descricao) {
                exercicio.descricao = descricao;
            }
            if (series) {
                exercicio.series = series;
            }
            if (repeticoes) {
                exercicio.repeticoes = repeticoes;
            }
            if (video) {
                exercicio.video = video;
            }
            await exercicio.save();
            return res.send({ erro: false, mensagem: 'Exercício editado com sucesso!' });
        }
        catch (err) {
            return res.status(400).send({ erro: false, mensagem: 'Falha na edição' });
        }
    }
    else {
        return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
    }
});

//Deletar exercicio
router.delete('/exercicio/:exercicioId', verifyJWTPersonal, async (req, res) => {
    const { exercicioId } = req.params;
    try {
        const exercicio = await Exercise.findOne({ where: { id: exercicioId } });
        if (!exercicio) {
            return res.status(400).send({ erro: false, mensagem: 'Exercício não encontrado' });
        }
        if (exercicio.personal != req.userId) {
            return res.status(400).send({ erro: false, mensagem: 'Id do personal não corresponde.' });
        }
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha na edição' });
    }
    try {
        await Exercise.destroy({ where: { id: treinoId } });
        return res.send({ erro: false, mensagem: 'Exercício deletado com sucesso!' });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha na edição' });
    }
});

//Listar exercícios (personal)
router.get('/exercicio', verifyJWTPersonal, async (req, res) => {
    try {
        const exercicio = await Exercise.findAll({ where: { personal: req.userId } });
        if (!exercicio) {
            return res.status(400).send({ erro: false, mensagem: 'Exercício não encontrados' });
        }
        return res.send({ erro: false, exercicio });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha na consulta' });
    }
});

//Listar exercicio (aluno)
router.get('/treino/:personalId', verifyJWTAluno, async (req, res) => {
    const { personalId } = req.params;
    try {
        const exercicio = await Exercise.findAll({ where: { personal: personalId } });
        if (!exercicio) {
            return res.status(400).send({ erro: false, mensagem: 'Exercícios não encontrados' });
        }
        return res.send({ erro: false, exercicio });
    }
    catch (err) {
        return res.status(400).send({ erro: false, mensagem: 'Falha na consulta' });
    }
});
