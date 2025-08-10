

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB!');
});

// API routes
app.use('/api/users', usersRouter);   // User routes
app.use('/api/admin', adminRouter);   // Admin routes

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
