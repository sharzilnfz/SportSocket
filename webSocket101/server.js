import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, request) => {
  const ip = request.socket.remoteAddress;

  socket.on('message', (rawData) => {
    console.log({ rawData });
    const message = rawData.toString();

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(`Server Broadcast: ${message}`);
      }
    });
  });
  socket.on('error', (err) => {
    console.log(`Error: ${err.message}: ${ip}`);
  });
  socket.on('close', () => {
    console.log(`Client Disconnected`);
  });
});
