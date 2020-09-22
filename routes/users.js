const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me', updateUserProfile);

module.exports = router;
