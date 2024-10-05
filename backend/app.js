const express = require('express');
const mongoose = require('mongoose')
const userController = require('./controllers/user')
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', (req, res, next) => {
  const stuff = [
    {
      email: 'test@test.com',
      password: 'qeesgtrj',
    },
  ];
  res.status(200).json(stuff);
});

app.use('/api/sauces', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'My first thing',
      description: 'All of the info about my first thing',
      imageUrl: '',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'My second thing',
      description: 'All of the info about my second thing',
      imageUrl: '',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(stuff);
});

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
app.use('/api/auth',userController.signup)

module.exports = app;