import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import { matchRouter } from './Routes/match.routes.js';
import { attachWebSocketServer } from './ws/server.js';

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
const server = http.createServer(app);

// Middleware to parse JSON bodies
app.use(express.json());

app.use(securityMiddleware());


app.use('/matches', matchRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

// Root GET route
app.get('/', (req, res) => {
  res.json({ message: 'Hello! Your Express server is up and running.' });
});

// Start the server
server.listen(PORT, HOST, () => {
  const baseUrl =
    HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;

  console.log(`Server is running on ${baseUrl}`);
  console.log(
    `WebSocket Server is running on ${baseUrl.replace('http', 'ws')}/ws`,
  );
});
