import { WebSocket } from 'node:http';

const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
  console.log(`Message from Server: `, event.data);
};
socket.onopen = () => {
  socket.send(`Hello from sharzil`);
};
