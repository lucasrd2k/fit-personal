//Criar um rota para cadastrar um aluno
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');

const Aluno = require('../models/Student');

router.post("/cadastro", async (req, res) => {
    const { nome, telefone, dt_nasc, email, senha, foto, status_pagamento, status, usuario } = req.body;
    try {
        let fileName = '../img/default.png';
            if (foto) {
                const buffer = new Buffer.from(foto.split(',')[1], 'base64');
                const $extension = foto.split(';')[0].split('/')[1];
                if ($extension != 'jpeg' && $extension != 'png' && $extension != 'jpg') {
                    return res.status(200).json({
                        error: true,
                        message: "Formato de imagem inválido!"
                    });
                }
                fileName = `${new Date().getTime()}.${$extension}`;
                const filePath = path.join(__dirname, '../img', fileName);

                fs.writeFileSync(filePath, buffer);
            }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(senha, salt);
        const aluno = await Aluno.create({
            nome: nome,
            telefone: telefone,
            dt_nasc: dt_nasc,
            email: email,
            senha: hashedPassword,
            foto: fileName,
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
