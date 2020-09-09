const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

const router = express.Router();

router.get('/', (req, res) => {
  fsPromises
    .readFile(usersPath, { encoding: 'utf8' })
    .then((users) => {
      res.send(JSON.parse(users));
    })
    .catch(() => {
      res.status(500);
      res.send({ message: 'Requested resource not found' });
    });
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  fsPromises
    .readFile(usersPath, { encoding: 'utf8' })
    .then((users) => {
      const usersJson = JSON.parse(users);
      const user = usersJson.find(({ _id }) => userId === _id);
      if (!user) {
        res.status(404);
        res.send({ message: 'User ID not found' });
        return;
      }
      res.send(user);
    })
    .catch(() => {
      res.status(500);
      res.send({ message: 'Requested resource not found' });
    });
});

module.exports = router;
