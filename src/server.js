// parou o video aos 2:33:00 
const express = require('express')
const server = express()
const rota = require('./routes')
const path = require("path")

//define a templete engine padrão
server.set('view engine', 'ejs')

//muda a localização da pasta views.
server.set('views', path.join(__dirname, 'views'))

//comando para descriptar o req.body, para acessar a propriedades do formulário ou seja os dados inputados
server.use(express.urlencoded({ extended: true }))

//comando que define a pasta de arquivos estáticos
server.use(express.static("Public"))

//para que as rotas funcionem
server.use(rota)

//ativa o servidor
server.listen("3000", () => {
    console.log("Servidor local rodando... 'CTRL + C' para encerrar!")
})
