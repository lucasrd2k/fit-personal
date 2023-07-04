const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { verifyJWTAluno, verifyJWTPersonal } = require('./controllers/verify');

const Auth = require('./controllers/auth');
const cadAluno = require('./controllers/cadAluno');
const AuthAluno = require('./controllers/authAluno');
const Exercise = require('./models/Exercise');
const Personal = require('./models/Sprint');
const Training = require('./models/Training');
require('./models/Associations');

//comando pra ver as informações da tabela é como mesmo no mysql?
//show tables;

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

app.use('/', Auth);
app.use('/aluno/', AuthAluno);
app.use('/aluno/', verifyJWTPersonal, cadAluno);
// app.use('/aluno', verifyJWTAluno, AuthAluno);
// app.use('/usuario', verifyJWTPersonal, Auth);




// Iniciar o app na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando no endereço: https://localhost:3000");
});
