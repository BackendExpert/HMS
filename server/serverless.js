const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const ConnectDB = require('../config/DB');
const authRoute = require('../routes/authRoute');
const studentRoute = require('../routes/studentRoute');
const hostelRoute = require('../routes/hostelRoute');
const roomRoute = require('../routes/roomRoute');

// Initialize Express app
const app = express();

// Connect to MongoDB
ConnectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/auth', authRoute);
app.use('/student', studentRoute);
app.use('/hostel', hostelRoute);
app.use('/room', roomRoute);

// Root route to test if API is working
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Export handler for serverless
module.exports = app;
module.exports.handler = serverless(app);
