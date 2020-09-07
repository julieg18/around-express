const express = require('express');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const server = express();

server.use(express.static('public'));
server.use('/cards', cardsRouter);
server.use('/users', usersRouter);
server.use('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
