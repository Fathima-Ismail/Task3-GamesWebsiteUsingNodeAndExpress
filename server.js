const express = require('express');
const morgan = require('morgan');
const http = require('http'); // Import the HTTP module
const socketIo = require('socket.io'); // Import Socket.IO
const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server using Express app
const server = http.createServer(app);

// Create a Socket.IO instance attached to the HTTP server
const io = socketIo(server);

// Set up morgan to log to the console
app.use(morgan('combined')); // Log to console

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define routes for each game
app.get('/mysweeper', (req, res) => {
  res.sendFile(__dirname + '/public/mysweeper.html');
});

app.get('/snake', (req, res) => {
  res.sendFile(__dirname + '/public/snake.html');
});

app.get('/tic', (req, res) => {
  res.sendFile(__dirname + '/public/tic.html');
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages from the client
  socket.on('chat message', (message) => {
    console.log('Message from client:', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});