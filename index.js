const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/Connection')
const Pergunta = require('./database/models/Pergunta')
const Resposta = require('./database/models/Resposta')
const routerP = require('./pergunta/pergunta')
const routerR = require('./resposta/resposta')
//const router = require('./pergunta/pergunta')

app.set('view engine', 'ejs')// configurando o motor de HTML, Renderizador de HTML.
 
//para ultilizaer arquivos estaticos, tipo imagens, bootstrap entre outros
app.use(express.static('public'))

//bodyParser configuraçao
app.use(bodyParser.urlencoded({extended: false}))// permite capturar os dados do usuario.
app.use(bodyParser.json())//permite usar dados do usuario via JSON.
// abrir uma conexao como o mysl
connection.authenticate().then(() =>{
    console.log('Conexao com o banco feita com sucesso.')
}).catch((erro)=>{
    console.log('Erro ao se conectar ao banco '+ erro)
})

app.use('/', routerP)
app.use('/', routerR)


app.get('/pergunta/:id?', (req, res)=>{
    var id = req.params.id

    Pergunta.findOne({where: {id: id} }).then(pergunta => {
     
        Resposta.findAll({
            where: {perguntaId: pergunta.id}

        }).then(respostas => {
        
                res.render('pergunta', {pergunta: pergunta, respostas: respostas})
            
        }).catch( ()=>{
            
            res.render('pergunta', {pergunta: pergunta})
        })
  
    }).catch(() => {

        console.log('Essa pergunta nao existe')
        res.redirect('/')

    })
})


app.listen(3001, ()=>{
    console.log('Servidor Rodando na pota 3001')
}) 