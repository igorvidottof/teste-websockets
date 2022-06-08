
const WebSocket = require('ws');

const porta = process.env.PORT || 8000


const wsServer = new WebSocket.Server({
    port: porta
});

wsServer.on('connection', function (socket) {
    // Some feedback on the console
    console.log("A client just connected");

    // Attach some behavior to the incoming socket
    socket.on('mensagem', function (msg) {
        console.log("Mensagem do cliente: " + msg);
        // socket.send("Take this back: " + msg);

        // Broadcast that message to all connected clients
        wsServer.clients.forEach(function (client) {
            client.send("Alguém disse: " + msg);
        });

    });

    socket.on('close', function () {
        console.log('Client disconnected');
    })

});

console.log((new Date()) + " Server is listening on port " + porta);