const dgram = require('dgram');
const s = dgram.createSocket('udp4');

var instrument = process.argv[2];
var sound;
switch(instrument) {
    case "piano":
        sound = "ti-ta-ti";
        break;
    case "trumpet":
        sound = "pouet";
        break;
    case "flute":
        sound = "trulu";
        break;
    case "violin":
        sound = "gzi-gzi";
        break;
    case "drum":
        sound = "boum-boum";
        break;
}

var message = new Buffer(sound);

setInterval(function()
    {
        s.send(message, 0, message.length, 2205, '230.1.2.3', function(err, bytes){
            console.log("Sending payload: " + message + " via port 2205.");
        });
    }, 1000
);


/*
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(2205);
*/
/*message = new Buffer(payload);
s.send(message, 0, message.length, 2205, multicast_address, function(err, bytes){
	console.log("Sending payload: " + payload + " via port " + s.address().port;
});*/
