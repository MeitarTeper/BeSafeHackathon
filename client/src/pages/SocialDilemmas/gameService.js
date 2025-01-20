// src/services/gameService.js
import { io } from 'socket.io-client';

class GameService {
  constructor() {
    this.socket = null;
    this.gameCode = null;
    this.callbacks = {
      onPlayerJoin: () => {},
      onGameStart: () => {},
      onAllAnswersSubmitted: () => {},
      onNextScenario: () => {},
      onGameEnd: () => {},
      onPlayerLeft: () => {},
      onError: () => {}
    };
  }

  connect() {
    // התחברות לפורט 5000 של השרת
    this.socket = io('http://localhost:5000', {
      transports: ['websocket'],
      cors: {
        origin: "http://localhost:3000"
      }
    });
    
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.callbacks.onError(error);
    });

    this.socket.on('playerJoined', (player) => {
      console.log('Player joined:', player);
      this.callbacks.onPlayerJoin(player);
    });

    this.socket.on('gameStarted', () => {
      console.log('Game started');
      this.callbacks.onGameStart();
    });

    this.socket.on('allAnswersSubmitted', (data) => {
      console.log('All answers submitted:', data);
      this.callbacks.onAllAnswersSubmitted(data);
    });

    this.socket.on('nextScenario', () => {
      console.log('Next scenario');
      this.callbacks.onNextScenario();
    });

    this.socket.on('gameEnded', (data) => {
      console.log('Game ended:', data);
      this.callbacks.onGameEnd(data);
    });

    this.socket.on('playerLeft', (data) => {
      console.log('Player left:', data);
      this.callbacks.onPlayerLeft(data);
    });
  }

  async createGame(gameType) {
    return new Promise((resolve, reject) => {
      this.socket.emit('createGame', { gameType }, (response) => {
        console.log('Create game response:', response);
        if (response.error) {
          reject(new Error(response.error));
        } else {
          this.gameCode = response.gameCode;
          resolve(response);
        }
      });
    });
  }

  async joinGame(gameCode, playerName) {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinGame', { gameCode, playerName }, (response) => {
        console.log('Join game response:', response);
        if (response.error) {
          reject(new Error(response.error));
        } else {
          this.gameCode = gameCode;
          resolve(response);
        }
      });
    });
  }

  startGame() {
    console.log('Starting game:', this.gameCode);
    this.socket.emit('startGame', { gameCode: this.gameCode });
  }

  async submitAnswer(answer) {
    return new Promise((resolve, reject) => {
      this.socket.emit('submitAnswer', {
        gameCode: this.gameCode,
        answer
      }, (response) => {
        console.log('Submit answer response:', response);
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response);
        }
      });
    });
  }

  forceNextScenario() {
    console.log('Forcing next scenario:', this.gameCode);
    this.socket.emit('forceNextScenario', { gameCode: this.gameCode });
  }

  onPlayerJoin(callback) {
    this.callbacks.onPlayerJoin = callback;
  }

  onGameStart(callback) {
    this.callbacks.onGameStart = callback;
  }

  onAllAnswersSubmitted(callback) {
    this.callbacks.onAllAnswersSubmitted = callback;
  }

  onNextScenario(callback) {
    this.callbacks.onNextScenario = callback;
  }

  onGameEnd(callback) {
    this.callbacks.onGameEnd = callback;
  }

  onPlayerLeft(callback) {
    this.callbacks.onPlayerLeft = callback;
  }

  onError(callback) {
    this.callbacks.onError = callback;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.gameCode = null;
    }
  }
}

const gameService = new GameService();
export default gameService;