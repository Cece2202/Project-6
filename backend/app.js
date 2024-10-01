const express = require('express');
const mongoose = require('mongoose')

const app = express();

// const user = require('./models/user');

// app.post('/api/auth', (req, res, next) => {
//   const user = new user({
//     email: req.body.title,
//     password: Hash,
//   });
//   user.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Post saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

mongoose.connect('mongodb+srv://cparker4400:1SseRxj3NnINk6ll@cluster0.x1erk.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// app.use((req, res, next) => {
//     console.log('Request received!');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next(); 
// });

// app.use((req, res, next) => {
//     res.json({ message: 'Your request was successful!' });
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Response sent successfully!');
// });

module.exports = app;