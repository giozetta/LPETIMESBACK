const { pool } = require('../config');

const getJogadores = (request, response) => {
    pool.query(`select s.codigo as codigo, s.nome as nome, 
        s.idade as idade, s.altura as altura, 
        s.time as time, p.nome as nometime
        from jogadores s
        join times p on s.time = p.codigo
        order by s.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar os jogadores: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addJogador = (request, response) => {
    const {nome, idade, altura, time} = request.body;
    pool.query(`insert into jogadores (nome, idade, altura, time) 
    values ($1, $2, $3, $4)
    returning codigo, nome, idade, altura, time`, 
    [nome, idade, altura, time] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir o jogador!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogador criado!",
            objeto : results.rows[0]
        });
    })
}

const updateJogador = (request, response) => {
    const {codigo, nome, idade, altura, time} = request.body;
    pool.query(`UPDATE jogadores
	SET nome=$1, idade=$2, altura=$3, time=$4
	WHERE codigo=$5
returning codigo, nome, idade, altura, time`, 
    [nome, idade, altura, time, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar o jogador!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogador atualizado!",
            objeto : results.rows[0]
        });
    })
}


const deleteJogagor = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM jogadores WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover o jogador! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogador removido!"
        });
    })
}

const getJogadorPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM jogadores WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar o jogador!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports = {
    getJogadores, addJogador, updateJogador, deleteJogagor, getJogadorPorCodigo
}