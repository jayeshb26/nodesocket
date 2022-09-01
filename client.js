const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8800");
    ioClient.on('connect', function (data) {
        ioClient.emit('storeClientInfo', { customId:"id",name:"jayesh" });
    });