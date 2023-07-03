const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_crisdrigo_modas', 'root', '@DLe200320', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});


module.exports  = sequelize;