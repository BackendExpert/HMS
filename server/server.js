const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');


// routes
const ConnectDB = require('./config/DB')
const authRoute = require('./routes/authRoute')
const studentRoute = require('./routes/studentRoute')
const hostelRoute = require('./routes/hostelRoute')
const roomRoute = require('./routes/roomRoute')
const reallocationRoute = require('./routes/reallocationRoute')

const app = express();
const PORT = process.env.PORT || 5000;

ConnectDB();
  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoute)
app.use('/student', studentRoute)
app.use('/hostel', hostelRoute)
app.use('/room', roomRoute)
app.use('/reallocation', reallocationRoute)

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});