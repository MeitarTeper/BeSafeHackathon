import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import scoreRoutes from './routes/score.js'; // Import the routes
import userRoutes from './routes/user.js'; // Import the routes
var session = require('express-session')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(session({
  secret: 'keyboard cat',
  cookie: {}
}));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

app.use(cors({
  origin: process.env.CLIENT_URL
}));

// Use the routes file for all `/scores` routes
app.use('/scores', scoreRoutes);
// Use the routes file for all `/users` routes
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
