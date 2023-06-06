//Criar um rota para cadastrar um aluno
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Aluno = require('../models/Student');

//Criar um rota para cadastrar um aluno
// nome
// telefone
// dt_nasc
// email
// senha
// foto
// status_pagamento
// status
// usuario
router.post("/cadastro", async (req, res) => {
    const { nome, telefone, dt_nasc, email, senha, foto, status_pagamento, status, usuario } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(senha, salt);
        const aluno = await Aluno.create({
            nome: nome,
            telefone: telefone,
            dt_nasc: dt_nasc,
            email: email,
            senha: hashedPassword,
            foto: foto,
            status_pagamento: status_pagamento,
            status: status,
            usuario: usuario
        });
        res.status(201).json(aluno);
    }
    catch (err) {
        res.status(500).send();
    }
});


module.exports = router;
