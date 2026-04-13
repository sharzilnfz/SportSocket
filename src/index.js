import 'dotenv/config';
import express from 'express';
import { matchRouter } from './Routes/match.routes.js';

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/matches', matchRouter);
// Root GET route
app.get('/', (req, res) => {
  res.json({ message: 'Hello! Your Express server is up and running.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`Root URL: http://localhost:${port}`);
});
