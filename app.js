const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const server = express();

server.use(bodyParser.json());
server.use((req, res, next) => {
  req.user = {
    _id: '5f688ec6cb50aa25e414a223',
  };

  next();
});
server.use('/cards', cardsRouter);
server.use('/users', usersRouter);
server.use('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

server.listen(PORT);
