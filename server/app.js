// app.js or server.js (your main file)
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const auctionRoutes = require('./routes/auctions');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configs/swaggerConfig');
const socket = require('./socket'); // Import the socket module
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

const server = http.createServer(app);
socket.initSocket(server); // Initialize Socket.IO with the server

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use('/api', auctionRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/bid-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);

// Setup Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
