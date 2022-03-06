
const Sequelize = require('sequelize');

const Connection = new Sequelize('guiaperguntas','root','1436J7ton@',{
    host:'localhost',
    dialect:'mysql',
    logging: false
});

module.exports = Connection;