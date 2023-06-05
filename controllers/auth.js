const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const { time } = require('console');
//dotenv
console.log(process.env.JWT_KEY);
//Criar uma função de gerar token
function generateToken(usuario, expires) {
    return jwt.sign({ userId: usuario }, process.env.JWT_KEY, { expiresIn: expires });
}


//Rota para login
router.post("/login", async (req, res) => {
    const { email, senha, manterConectado } = req.body;
    try {
        var user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user || user == null) {
            return res.status(200).json({
                error: true,
                message: "Usuário não encontrado!"
            });
        }
        try {
            var eValido = await bcrypt.compare(senha, user.senha);
            if (eValido) {
                if (manterConectado) {
                    var timeExpires = '7d';
                }
                else {
                    var timeExpires = '2h';
                }
                var token = generateToken(user.id, timeExpires);

                res.status(200).json({
                    id: user.id,
                    nome: user.nome,
                    token: token,
                });
            }
            else {
                console.log("Senha inválida!");
                return res.status(200).json({
                    error: true,
                    message: "Senha inválida!"
                });
            }
        } catch (error){
            console.log("Senha inválida!"+ error);
            return res.status(200).json({
                error: true,
                message: "Senha inválida!"
            });

        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Erro ao autenticar usuário!"
        });
    }
});


//Rota para cadastro
router.post("/cadastro", async (req, res) => {
    const { nome, profissao, dt_nasc, email, senha, telefone, foto, tipo } = req.body;
    try {
        const user = await User.findOne({
            where: { //email, cpf ou telefone
                [Sequelize.Op.or]: [
                    { email: email },
                    { telefone: telefone }
                ]
            }
        });
        if (user) {
            console.log("Usuário já cadastrado!");
            return res.status(200).json({
                error: true,
                message: "Usuário já cadastrado!"
            });
        }
        try {
            var hash = await bcrypt.hash(senha, 10);
            //Verificar se a foto foi enviada
            if (foto) {
                const buffer = new Buffer.from(foto.split(',')[1], 'base64');
                const $extension = foto.split(';')[0].split('/')[1];
                if ($extension != 'jpeg' && $extension != 'png' && $extension != 'jpg') {
                    return res.status(200).json({
                        error: true,
                        message: "Formato de imagem inválido!"
                    });
                }
                const fileName = `${new Date().getTime()}.${$extension}`;
                const filePath = path.join(__dirname, '../img', fileName);

                fs.writeFileSync(filePath, buffer);
            }
            else {
                const fileName = '../img/default.png';
            }
            const user = await User.create({
                nome: nome,
                profissao: profissao,
                dt_nasc: dt_nasc,
                email: email,
                senha: hash,
                telefone: telefone,
                foto: fileName,
                tipo: tipo
            });
            // Gerar token jwt
            var token = generateToken(user.id, '2h');
            // Retornar o token
            res.status(200).json({
                error: false,
                id: user.id,
                nome: user.nome,
                token: token,
                message: "Usuário cadastrado com sucesso!"
            });
            console.log("Usuário cadastrado com sucesso!");
        } catch (error) {
            res.status(200).json({
                error: true,
                message: "Erro ao cadastrar usuário!"
            });
            console.log("Erro ao cadastrar usuário!"+error);
        }
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Erro ao cadastrar usuário!"
        });
        console.log("Erro ao cadastrar usuário!"+error);
    }
});



module.exports = router;
