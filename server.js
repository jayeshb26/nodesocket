
const
{Server} = require("socket.io"),

server = new Server(800);
var gaze = server.of('/gaze').on('connection', function (socket) {
    socket.on('gaze', function (gdata) {
        gaze.emit('gaze', gdata.toString());
    });
});
var clients =[];
let

sequenceNumberByClient = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {

socket.on('storeClientInfo', function (data) {

    var clientInfo = new Object();
    clientInfo.customId         = data.customId;
    clientInfo.clientId     = socket.id;
    clientInfo.name     = data.name;
    clients.push(clientInfo);
   // console.info(`clientInfo.name connected [id=${socket.id}]`);
    console.info(`[name=${data.name}] connected [id=${socket.id}]`);
});
console.info(`Client connected [id=${socket.id}]`);
// initialize this client's sequence number
sequenceNumberByClient.set(socket, 1);


// when socket disconnects, remove it from the list:
socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
});
});

// sends each client its current sequence number
setInterval(() => {
for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
    client.emit("seq-num", sequenceNumber);
    sequenceNumberByClient.set(client, sequenceNumber + 1);
}
}, 1000);