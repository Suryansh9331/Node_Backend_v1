// index.js
// Initial setup for Express + MongoDB application with Admin + User functionality
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // ensure 'config' is lowercase if your folder is lowercase
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin'); // <-- Import admin routes
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Simple root route
app.get('/', (req, res) => res.send('Hello from Express + MongoDB!'));

// API routes
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter); // <-- Add admin routes here

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler (must be after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
