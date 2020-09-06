const express = require('express');
const path = require('path');

const users = require(path.join(__dirname, '..', 'data', 'users.json'));

const router = express.Router();

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.find(({ _id }) => userId === _id);
  if (!user) {
    res.status(404);
    res.send({ message: 'User ID not found' });
    return;
  }
  res.send(user);
});

module.exports = router;
