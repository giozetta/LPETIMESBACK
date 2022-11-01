const { pool } = require('../config')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

// login autenticação
const login = (request, response, next) => {
    const { email, senha } = request.body
    pool.query('SELECT * FROM usuarios where email = $1 and senha = $2', [email, senha], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ auth: false, message: 'usuário ou Senha inválidos' + error});
        }
        const email_usuario = results.rows[0].email; //ID do usuário retornado do BD
        const nome_usuario = results.rows[0].nome;
        const token = jwt.sign({ email_usuario,nome_usuario }, process.env.SECRET, {
            expiresIn: 300 //expira em 5 min
        })
        return response.json({ auth: true, token: token })
    },
    )
}

// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(500).json({ auth: false, message: 'Erro ao autenticar o token.' });

        // Se o token for válido, salva no request para uso posterior
        request.email_usuario = decoded.email_usuario;
        next();
    });
}

module.exports = {
    login, verificaJWT
}