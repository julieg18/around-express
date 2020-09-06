const express = require('express');
const path = require('path');

const cardsRouter = require(path.join(__dirname, 'routes', 'cards'));
const usersRouter = require(path.join(__dirname, 'routes', 'users'));

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
