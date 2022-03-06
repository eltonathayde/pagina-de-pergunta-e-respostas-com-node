// MODEL !!! 
// transforma codigo JS em tabela no mysql


const Sequelize = require("sequelize");
const Connection = require("./database");

const Pergunta = Connection.define('pergunta',{
    //  campo criado da tabela 
    titulo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    // campo criado da tabela 
    descricao:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

 Pergunta.sync({force:false}).then(()=>{});
 
 module.exports = Pergunta;
  