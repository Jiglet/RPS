const http = require('http');
const express = require('express')
const socketio = require('socket.io');

const RpsGame = require('./rps');

const app = express();

const clientPath = `${__dirname}/../client`
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

//Check if player is waiting for someone to connect
let waitingPlayer = null;

io.on('connection', (sock) => {
	if (waitingPlayer) { //Start a game
		sock.emit('message', 'You are P2. Welcome to RPS!');
		new RpsGame(waitingPlayer, sock);
		waitingPlayer = null;
	} else {
		waitingPlayer = sock;
		sock.emit('message', 'You are P1. Welcome to RPS!');
		waitingPlayer.emit('message', 'Waiting for an opponent...');
	}

	sock.on('message', (text) => {
		io.emit('message', text);
	})
})

server.on('error', () => {
	console.error('Server error', err);
});

server.listen(8080, () => {
	console.log('RPS started on 8080');
});