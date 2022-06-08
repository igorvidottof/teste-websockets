
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    io.emit('connection-ok', 'Hello World!');

    socket.on('message', (message) => {
        console.log(message);
        const el = document.createElement('li');
        el.innerHTML = message;
        document.querySelector('ul').appendChild(el);
        io.emit('Recebi a mensagem!!!');
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });



