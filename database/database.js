const Sequelize = require('sequelize')
const connection = new Sequelize('guiaperguntas', 'root', 'tigre225', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;