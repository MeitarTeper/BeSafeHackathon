import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path'; // הוסף ייבוא של path
import lessonsRoutes from './routes/LessonPlans.js';
import cardsRoutes from './routes/cardsRoutes.js';
import chatRoutes from './routes/chat.js';
import scoreRoutes from './routes/score.js'; // הוסף ייבוא של scoreRoutes
import userRoutes from './routes/user.js'; // הוסף ייבוא של userRoutes
import session from 'express-session';
// טוען את משתני הסביבה מקובץ .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ['GET', 'POST'],
  credentials: true
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
app.use(express.json());

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Game state management
const activeGames = new Map();

const generateGameCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const checkAllPlayersAnswered = (game, scenarioId) => {
  if (!game.players.size) return false;
  const answeredPlayers = new Set(
    Array.from(game.answers.values())
      .filter(answer => answer.scenarioId === scenarioId)
      .map(answer => answer.playerId)
  );
  return game.players.size === answeredPlayers.size;
};

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('createGame', (data, callback) => {
    try {
      const gameCode = generateGameCode();
      const game = {
        code: gameCode,
        teacherSocketId: socket.id,
        players: new Map(),
        answers: new Map(),
        currentScenario: 0,
        status: 'waiting'
      };
      
      activeGames.set(gameCode, game);
      socket.join(gameCode);
      
      console.log(`Game created: ${gameCode} by teacher ${socket.id}`);
      callback({ gameCode });
    } catch (error) {
      console.error('Error creating game:', error);
      callback({ error: error.message });
    }
  });

  socket.on('joinGame', ({ gameCode, playerName }, callback) => {
    try {
      const game = activeGames.get(gameCode?.toUpperCase());
      if (!game) {
        throw new Error('Game not found');
      }

      const player = {
        id: socket.id,
        name: playerName
      };

      game.players.set(socket.id, player);
      socket.join(gameCode);

      io.to(game.teacherSocketId).emit('playerJoined', player);
      console.log(`Player ${playerName} joined game ${gameCode}`);
      
      callback({ success: true });
    } catch (error) {
      console.error('Error joining game:', error);
      callback({ error: error.message });
    }
  });

  socket.on('startGame', ({ gameCode }) => {
    const game = activeGames.get(gameCode);
    if (game && game.teacherSocketId === socket.id) {
      game.status = 'playing';
      io.to(gameCode).emit('gameStarted');
      console.log(`Game ${gameCode} started`);
    }
  });

  socket.on('submitAnswer', ({ gameCode, answer }, callback) => {
    try {
      const game = activeGames.get(gameCode);
      if (!game) {
        throw new Error('Game not found');
      }

      game.answers.set(`${socket.id}-${answer.scenarioId}`, {
        ...answer,
        playerId: socket.id,
        playerName: game.players.get(socket.id)?.name
      });

      if (checkAllPlayersAnswered(game, answer.scenarioId)) {
        const scenarioAnswers = Array.from(game.answers.values())
          .filter(a => a.scenarioId === answer.scenarioId);

        io.to(gameCode).emit('allAnswersSubmitted', {
          scenarioId: answer.scenarioId,
          answers: scenarioAnswers
        });
      }

      callback({ success: true });
    } catch (error) {
      callback({ error: error.message });
    }
  });

  socket.on('forceNextScenario', ({ gameCode }) => {
    const game = activeGames.get(gameCode);
    if (game && game.teacherSocketId === socket.id) {
      game.currentScenario += 1;
      io.to(gameCode).emit('nextScenario');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    activeGames.forEach((game, gameCode) => {
      if (game.teacherSocketId === socket.id) {
        io.to(gameCode).emit('gameEnded', { reason: 'Teacher disconnected' });
        activeGames.delete(gameCode);
      } else if (game.players.has(socket.id)) {
        const player = game.players.get(socket.id);
        game.players.delete(socket.id);
        io.to(game.teacherSocketId).emit('playerLeft', { 
          playerId: socket.id,
          playerName: player.name 
        });
      }
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});