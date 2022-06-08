const express = require('express')
const app = express()

app.use(express.static("public"))

const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)

const porta = process.env.PORT || 8000

const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : "http://localhost"

http.listen(porta, function () {
    const portaStr = porta === 80 ? '' : ':' + porta

    if (process.env.HEROKU_APP_NAME)
        console.log('Servidor iniciado. Abra o navegador em ' + host)
    else console.log('Servidor iniciado. Abra o navegador em ' + host + portaStr)
})

app.get('/', function (requisicao, resposta) {
    resposta.sendFile(__dirname + '/index.html')
})


serverSocket.on('connect', function (socket) {
    socket.on('login', function (nickname) {
        socket.nickname = nickname
        const msg = 'Hello World!!! ' + nickname + ' conectou'
        console.log(msg)
        serverSocket.emit('mensagem', msg)
    })

    socket.on('disconnect', function () {
        console.log('Cliente desconectado: ' + socket.nickname)
    })

    socket.on('mensagem', function (msg) {
        serverSocket.emit('mensagem', `${socket.nickname} diz: ${msg}`)
    })

    socket.on('status', function (msg) {
        console.log(msg)
        socket.broadcast.emit('status', msg)
    })
})