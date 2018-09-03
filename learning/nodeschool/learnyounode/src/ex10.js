const net = require('net');
const strftime = require('strftime');

const port = process.argv[2] || 9001;

const server = net.createServer((socket) => {
  const date = new Date();
  socket.end(strftime('%Y-%m-%d %H:%M') + "\n");
});

server.listen(port);
