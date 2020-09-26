const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

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

app.get('/', (req, res)=>{
    Pergunta.findAll({raw: true, order:[ [ 'id', 'desc']] //ASC= CRESCENTE E DESC= DECRECENTE.
}).then(perguntas =>{
        res.render('index', {perguntas: perguntas})
    })
    
})

app.get('/perguntar', (req, res)=>{
   
    res.render('perguntar')
})

app.post('/salvapergunta', (req, res)=>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao

     Pergunta.create({
         titulo: titulo,
         descricao: descricao
     }).then(()=>{
         res.redirect('/')
         console.log('Dados inseridos com sucesso')
     }).catch((err)=>{
         console.log('Os dados nao foram iseridos')
     })

})

app.get('/pergunta/:id?', (req, res)=>{
    var id = req.params.id

    Pergunta.findOne({where: {id: id} }).then(pergunta => {
     
        Resposta.findAll({
            where: {perguntaId: pergunta.id}

        }).then(respostas => {
        
                res.render('pergunta', {pergunta: pergunta, respostas: respostas})
            
        }).catch( ()=>{
            let nenhuma = 'Ainda não existem respostas para essa pergunta'
            res.render('pergunta', {pergunta: pergunta, nenhuma: nenhuma})
        })
    
  
    }).catch(() => {

        console.log('Essa pergunta nao existe')
        res.redirect('/')

    })
})

app.post('/responder', (req, res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.perguntaId

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=> {
        console.log('Pergunta respondida.')
        res.redirect("/pergunta/"+perguntaId)
    }).catch((erro)=>{
        console.log('Houve um problesma ao responder' + erro)

    })

})



app.listen(3001, ()=>{
    console.log('Servidor Rodando na pota 3001')
}) 