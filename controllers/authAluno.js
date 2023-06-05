const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Student = require('../models/Student');
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
        var user = await Student.findOne({
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



module.exports = router;
