const express = require('express');
const router = express.Router();
const Players = require('../models/Players');




// Criar novo jogador
router.post('/', async (req, res) => {
    try {
        const newPlayer = await Players.create(req.body);
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Obter todos os jogadores
router.get('/', async (req, res) => {
    try {
        const gamePlayers = await Players.findAll();
        res.json(gamePlayers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;