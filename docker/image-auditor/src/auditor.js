// TCP
var dgram = require('dgram');

var s = dgram.createSocket('udp4');
var instruments = [];
s.bind(2205, function(){
    console.log("Joining multicast group");
    s.addMembership('230.1.2.3');
})
s.on('message', function(msg, source) {
    console.log("Data has arrived: " + msg + ". Sourc IP: " + source.address + ". Source port: " + source.port);
    console.log(msg.uuid);
    var sound = msg.toString();
    var instrument;
    switch(sound){
        case "ti-ta-ti":
            instrument = "piano";
            break;
        case "trulu":
            instrument = "flute";
            break;
        case "boum-boum":
            instrument = "drum";
            break;
        case "gzi-gzi":
            instrument = "violin";
            break;
        case "pouet":
            instrument = "trumpet";
            break;
    }
    if(instruments.indexOf(instrument) == -1){
        instruments.push(instrument);
    }

});


const net = require('net');

const PORT = 2205;
const ADDRESS = '127.0.0.1';

var server = net.createServer(onClientConnected);
server.listen(PORT, ADDRESS);

function onClientConnected(socket) {
    console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
    console.log(instruments);
    socket.destroy();
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);
