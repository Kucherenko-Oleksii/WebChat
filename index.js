var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
console.log('Server is running ');


app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log('Connection success');
    connections.push(socket);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnect success');
    });

    socket.on('send mess', function(data){
        io.sockets.emit('add mess', {mess: data.mess, name: data.name});
    });
});