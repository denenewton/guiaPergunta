const express = require('express')
const router = express.Router()
const connection = require('../database/Connection')
const Resposta = require('../database/models/Resposta')

connection.authenticate().then(() =>{
    console.log('Conexao com o banco feita com sucesso.')
}).catch((erro)=>{
    console.log('Erro ao se conectar ao banco '+ erro)
})

router.post('/responder', (req, res)=>{
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







module.exports = router
