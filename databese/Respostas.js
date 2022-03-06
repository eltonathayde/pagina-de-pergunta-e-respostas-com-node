// importtando o sequelize e fazendo conexão com banco de datos 
const Sequelize = require("sequelize");
const Connection = require("./database");

// criando o model

const Resposta = Connection.define("respostas",{
    // campo criado da tabela 
    corpo: {
        type:Sequelize.TEXT,
        allowNull:false
    },
    // campo criado da tabela 
    perguntaId:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
});

// não criar tabela se ela ja existir 
Resposta.sync({force:false});

// exportando o model
module.exports = Resposta;
