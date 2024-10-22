const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
// const userController = require('./controllers/user')
// const sauceController = require('./controllers/sauces')
// const user = require('./models/user');

const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce');


const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:4200' // Allow requests from this origin
}));

app.use(express.json());

require('dotenv').config();

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect('mongodb+srv://cparker4400:1SseRxj3NnINk6ll@cluster0.x1erk.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

// Static route to serve uploaded images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;