const {pool} = require('../config');

const getTimes = (request, response) => {
    pool.query('SELECT * FROM times order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o time: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const addTime = (request, response) => {
    const {nome, cidade} = request.body;
    pool.query(`INSERT INTO times (nome, cidade) 
    values ($1, $2) returning codigo, nome, cidade`,
    [nome, cidade],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir o prédio: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Time criado",
            objeto: results.rows[0]
        })
    })
}

const updateTime = (request, response) => {
    const {codigo, nome, cidade} = request.body;
    pool.query(`UPDATE times SET nome=$1, cidade=$2
    where codigo=$3 returning codigo, nome, cidade`,
    [nome, cidade, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar o time: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Time alterado",
            objeto: results.rows[0]
        })
    })
}

const deleteTime = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM times WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover o time: ' + 
                (error ? error :'Não removeu nenhuma linha')
            })
        }
        response.status(200).json({
            status : "success" , message : "Time removido"
        })
    })
}

const getTimePorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM times WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o time: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getTimes, addTime, updateTime, deleteTime, getTimePorCodigo
}