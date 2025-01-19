import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('Received:', message);

      const reply = { sender: 'Expert', text: `תודה על ההודעה: "${message.text}"` };
      socket.send(JSON.stringify(reply));
    } catch (error) {
      console.error('Error parsing message:', error);
      socket.send(JSON.stringify({ sender: 'Expert', text: 'שגיאה בעיבוד ההודעה שלך' }));
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
