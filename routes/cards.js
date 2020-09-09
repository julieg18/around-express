const express = require('express');
const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

const router = express.Router();
router.get('/', (req, res) => {
  fsPromises
    .readFile(cardsPath, { encoding: 'utf8' })
    .then((cards) => {
      res.send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(500);
      res.send({ message: 'Requested resource not found' });
    });
});

module.exports = router;
