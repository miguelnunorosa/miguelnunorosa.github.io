const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'airsoftDB.sqlite'
});

const CreatePlayerTable = sequelize.define('Players', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberKills: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numberDeaths: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => console.log('Table created!\n'))
    .catch(err => console.log(err));

module.exports = CreatePlayerTable;
