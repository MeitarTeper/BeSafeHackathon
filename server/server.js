import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import scoreRoutes from './routes/score.js'; // Import the routes
import userRoutes from './routes/user.js'; // Import the routes
import lessonsRoutes from './routes/LessonPlans.js';
import cardsRoutes from './routes/cardsRoutes.js'; // Import the cards routes
import chatRoutes from './routes/chatRoutes.js'; // Import chat routes
import session from 'express-session';

// טוען את משתני הסביבה מקובץ .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(session({
  secret: 'keyboard cat',
  cookie: {}
}));

app.use(express.json({ limit: '20mb' })); // JSON middleware
app.use(express.urlencoded({ limit: '20mb', extended: true })); // URL-encoded middleware

app.use(cors({
  origin: process.env.CLIENT_URL
}));

// Use the routes file for all `/scores` routes
app.use('/scores', scoreRoutes);
// Use the routes file for all `/users` routes
app.use('/users', userRoutes);
// Use the routes file for all `/lessons` routes
app.use('/lessons', lessonsRoutes);
// Use the routes file for all `/cards` routes
app.use('/cards', cardsRoutes);
// Use the routes file for all `/chat` routes
app.use('/chat', chatRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
