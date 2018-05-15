// TCP
var dgram = require('dgram');

var s = dgram.createSocket('udp4');
var moment = require('moment')

var instruments = [];
var times = [5];
var active = [5];


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
    //allMessages.push(instrument);
    if(instruments.indexOf(instrument) == -1){
        instruments.push(instrument);
        active[(instruments.indexOf(instrument))] = (moment() );
    }

    times[(instruments.indexOf(instrument))] = (moment() );
    console.log(times);




});


setInterval(function()
    {
        for(i = 0; i < times.length; ++i){
            if(moment().diff(times[i], 'seconds')>=5){
                instruments.splice(i, 1);
                times.splice(i, 1);
                active.splice(i, 1)
            }
        }
    }, 10
);

const net = require('net');

const PORT = 2205;
const ADDRESS = '127.0.0.1';

var server = net.createServer(onClientConnected);
server.listen(PORT, ADDRESS);

function onClientConnected(socket) {
    console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
    var tab = [];
    //tab.push(instruments);
    for(i = 0; i < instruments.length; ++i){
        var test = new Object();
        test.instrument = instruments[i];
        test.activeSince = active[i];
        tab.push(test);
    }

    console.log(JSON.stringify(tab));
    socket.destroy();
}

console.log(`Server started at: ${ADDRESS}:${PORT}`);
