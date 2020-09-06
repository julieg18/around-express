const express = require('express');
const path = require('path');

const cards = require(path.join(__dirname, '..', 'data', 'cards.json'));

const router = express.Router();
router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
