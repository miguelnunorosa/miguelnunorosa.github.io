const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'airsoftDB.sqlite'
});

const Game1x1Result = sequelize.define('Game1x1Result', {
    player1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    player1Score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    player2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    player2Score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gameDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

sequelize.sync()
    .then(() => console.log('Database & tables created!\n'))
    .catch(err => console.log(err));

module.exports = Game1x1Result;
