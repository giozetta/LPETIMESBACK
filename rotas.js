const { Router } = require('express');

const controleTimes = require('./controladores/times');
const controleJogadores = require("./controladores/jogadores");
const seguranca = require("./controladores/seguranca");

const rotas = new Router();

rotas.route('/login')
    .post(seguranca.login);

rotas.route('/times')
    .get(seguranca.verificaJWT, controleTimes.getTimes)
    .post(seguranca.verificaJWT, controleTimes.addTime)
    .put(seguranca.verificaJWT, controleTimes.updateTime)

rotas.route('/times/:codigo')
    .get(seguranca.verificaJWT, controleTimes.getTimePorCodigo)
    .delete(seguranca.verificaJWT, controleTimes.deleteTime)

rotas.route('/jogadores')
    .get(seguranca.verificaJWT, controleJogadores.getJogadores)
    .post(seguranca.verificaJWT, controleJogadores.addJogador)
    .put(seguranca.verificaJWT, controleJogadores.updateJogador)

rotas.route('/jogadores/:codigo')
    .get(seguranca.verificaJWT, controleJogadores.getJogadorPorCodigo)
    .delete(seguranca.verificaJWT, controleJogadores.deleteJogagor)

module.exports = rotas;