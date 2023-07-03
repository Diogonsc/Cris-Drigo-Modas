const Sequelize = require('sequelize');
const database = require('./db');

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    total: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
});	

module.exports = Produto;