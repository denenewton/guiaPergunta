const express = require('express')
const router = express.Router();
const connection = require('../database/Connection')
const Pergunta = require('../database/models/Pergunta');

connection.authenticate().then(() =>{
    console.log('Conexao com o banco feita com sucesso.')
}).catch((erro)=>{
    console.log('Erro ao se conectar ao banco '+ erro)
})


router.get('/', (req, res)=>{
    Pergunta.findAll({raw: true, order:[ [ 'id', 'desc']] //ASC= CRESCENTE E DESC= DECRECENTE.
}).then(perguntas =>{
        res.render('index', {perguntas: perguntas})
    })
    
})

router.post('/salvapergunta', (req, res)=>{
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

router.get('/perguntar', (req, res)=>{
   
    res.render('perguntar')
})




module.exports = router;