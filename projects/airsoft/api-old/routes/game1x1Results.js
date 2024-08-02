const express = require('express');
const router = express.Router();
const GameResult = require('../models/Game1x1Results');

// Criar novo resultado de jogo
router.post('/', async (req, res) => {
    try {
        const newGameResult = await GameResult.create(req.body);
        res.status(201).json(newGameResult);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obter todos os resultados de jogos
router.get('/', async (req, res) => {
    try {
        const gameResults = await GameResult.findAll();
        res.json(gameResults);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
