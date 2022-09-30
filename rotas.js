const { Router } = require('express');

const controleTimes = require('./controladores/times');
const controleJogadores = require("./controladores/jogadores");

const rotas = new Router();

rotas.route('/times')
    .get(controleTimes.getTimes)
    .post(controleTimes.addTime)
    .put(controleTimes.updateTime)

rotas.route('/times/:codigo')
    .get(controleTimes.getTimePorCodigo)
    .delete(controleTimes.deleteTime)

rotas.route('/jogadores')
    .get(controleJogadores.getJogadores)
    .post(controleJogadores.addJogador)
    .put(controleJogadores.updateJogador)

rotas.route('/jogadores/:codigo')
    .get(controleJogadores.getJogadorPorCodigo)
    .delete(controleJogadores.deleteJogagor)

module.exports = rotas;