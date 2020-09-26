const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('resposta', { 
  corpo: {
      type: Sequelize.TEXT,
      allowNull: false,
      require: true

  },
  perguntaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      require: true
  }
   
});

Resposta.sync({force: false})


module.exports = Resposta;