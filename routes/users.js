const express = require('express');
const { getUsers, getUser, createUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);

module.exports = router;
