const express = require("express");
const req = require("express/lib/request");
const app = express();
const bodyParse= require("body-parser")
const Connection= require("./databese/database")
const Pergunta= require("./databese/Pergunta");
const res = require("express/lib/response");
const Resposta = require ("./databese/Respostas");

// Data 
try {
    Connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// estou dizendo  para o  Exprsse usar o ejs como view engine
app.set('view engine','ejs');
app.use(express.static('public'));
// body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// rotas
// renderizando os arquivos da pasta view
app.get("/",(req,res)=>{
    // metodo de ordenação
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']  // ASC = crescente  // DESC = decrescente // como ordem as perguntas no front end.
    ]}).then(perguntas=>{
        console.log(perguntas)
        res.render("index",{
            perguntas:perguntas
        });
    });
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar")
});
// onde os dados do formulario chegam
app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo; 
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao,    
    }).then(()=>{
        res.redirect("/");
    });
});
//  rota da pagina de perguntas
app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id:id},
    }).then(pergunta =>{
        if(pergunta != undefined){ // a pergunta foi encontrada
            // exibindo resposta que tenha o mesmo id da pagina de pergunta.
            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order:[
                    ['id','DESC' ]
                ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta:  pergunta,
                    respostas: respostas
            }); 
         });
        }else{ // a pergunta não foi encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder",(req,res)=>{
    // define a variavel, pegando os campos pelo nome
    var corpo= req.body.corpo
    var perguntaId = req.body.pergunta

    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        // depois da criação da resposta o usuario será direcionado  a pagina da pergunta que ele respondeu  
        res.redirect("/pergunta/"+perguntaId);
    });

});

app.listen(8080,()=>{
    console.log("App rodando!")
});