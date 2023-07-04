//Aqui vamos criar e exportar as rotas da classe Treino

const express = require('express');
const router = express.Router();
const Treino = require('../models/Training');
const Exercicio = require('../models/Exercise');
const { verifyJWTAluno, verifyJWTPersonal } = require('./verify');
//Estrutura do treino
// nome
// descricao
// series
// repeticoes
// video
// personal