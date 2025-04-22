const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const ConnectDB = require('../config/DB');
const authRoute = require('../routes/authRoute');
const studentRoute = require('../routes/studentRoute');
const hostelRoute = require('../routes/hostelRoute');
const roomRoute = require('../routes/roomRoute');

const app = express();
ConnectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/auth', authRoute);
app.use('/student', studentRoute);
app.use('/hostel', hostelRoute);
app.use('/room', roomRoute);

app.get('/', (req, res) => {
  res.send('API is working');
});

module.exports = app;
module.exports.handler = serverless(app);
