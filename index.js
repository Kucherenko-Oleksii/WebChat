const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 3000);
console.log('Сервер працює ');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', function(socket){
    console.log('Підключено');
    connections.push(socket);

    socket.on('disconnect', function(){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Відключено');
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
});