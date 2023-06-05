function verifyJWTPersonal(req, res, next) {
    //Token bearer split
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Token não encontrado!"
        });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token inválido!"
            });
        }
        req.userId = decoded.userId;
        next();
    });
}

function verifyJWTAluno(req, res, next) {
    //Token bearer split
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Token não encontrado!"
        });
    }
    jwt.verify(token, process.env.JWT_KEY_ALUNO, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token inválido!"
            });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = {
    verifyJWTPersonal,
    verifyJWTAluno
}
