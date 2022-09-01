var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io
    .of('/')
    .on('connection', (socket) => {
        socket.on('send_message' , (data) => {
            console.log(data);

            socket.broadcast.emit('messages' , {
                id : data.id,
                message : data.message
            });

        });
    });

http.listen(3000, function(){
    console.log('listening on *:3000');
});