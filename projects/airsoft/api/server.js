const express = require('express');
const gamePlayers = require('./routes/players');
const gameResultsRouter = require('./routes/game1x1Results');
const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());


// Rotas
app.use('/api/gameResults', gameResultsRouter);
app.use('/api/gamePlayers', gamePlayers);






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
