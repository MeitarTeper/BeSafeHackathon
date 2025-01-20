// services/gameService/index.js

import { Server } from 'socket.io';

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

export const setupGameService = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('createGame', async (data, callback) => {
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

    socket.on('joinGame', async ({ gameCode, playerName }, callback) => {
      try {
        const game = activeGames.get(gameCode?.toUpperCase());
        if (!game) {
          throw new Error('Game not found');
        }

        if (game.status !== 'waiting') {
          throw new Error('Game already in progress');
        }

        const player = {
          id: socket.id,
          name: playerName,
          joinedAt: Date.now()
        };

        game.players.set(socket.id, player);
        socket.join(gameCode);

        // Notify teacher about new player
        io.to(game.teacherSocketId).emit('playerJoined', player);
        
        console.log(`Player ${playerName} (${socket.id}) joined game ${gameCode}`);
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
        game.startedAt = Date.now();
        io.to(gameCode).emit('gameStarted');
        console.log(`Game ${gameCode} started by teacher ${socket.id}`);
      }
    });

    socket.on('submitAnswer', async ({ gameCode, answer }, callback) => {
      try {
        const game = activeGames.get(gameCode);
        if (!game) {
          throw new Error('Game not found');
        }

        if (game.status !== 'playing') {
          throw new Error('Game not in playing state');
        }

        const answerWithMetadata = {
          ...answer,
          playerId: socket.id,
          playerName: game.players.get(socket.id)?.name,
          timestamp: Date.now()
        };

        game.answers.set(`${socket.id}-${answer.scenarioId}`, answerWithMetadata);

        if (checkAllPlayersAnswered(game, answer.scenarioId)) {
          const scenarioAnswers = Array.from(game.answers.values())
            .filter(a => a.scenarioId === answer.scenarioId);

          io.to(gameCode).emit('allAnswersSubmitted', {
            scenarioId: answer.scenarioId,
            answers: scenarioAnswers
          });
          
          console.log(`All players answered scenario ${answer.scenarioId} in game ${gameCode}`);
        }

        callback({ success: true });
      } catch (error) {
        console.error('Error submitting answer:', error);
        callback({ error: error.message });
      }
    });

    socket.on('forceNextScenario', ({ gameCode }) => {
      const game = activeGames.get(gameCode);
      if (game && game.teacherSocketId === socket.id) {
        game.currentScenario += 1;
        io.to(gameCode).emit('nextScenario');
        console.log(`Moving to next scenario in game ${gameCode}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      activeGames.forEach((game, gameCode) => {
        // If teacher disconnected
        if (game.teacherSocketId === socket.id) {
          io.to(gameCode).emit('gameEnded', { reason: 'Teacher disconnected' });
          activeGames.delete(gameCode);
          console.log(`Game ${gameCode} ended - teacher disconnected`);
          return;
        }

        // If player disconnected
        if (game.players.has(socket.id)) {
          const player = game.players.get(socket.id);
          game.players.delete(socket.id);
          io.to(game.teacherSocketId).emit('playerLeft', { playerId: socket.id, playerName: player.name });
          console.log(`Player ${player.name} left game ${gameCode}`);

          // End game if no players left
          if (game.players.size === 0) {
            activeGames.delete(gameCode);
            console.log(`Game ${gameCode} ended - no players remaining`);
          }
        }
      });
    });
  });
};