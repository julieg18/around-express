const UserModel = require('../models/user');
const { sendError } = require('../utils/utils');

function getUsers(req, res) {
  UserModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        defaultErrMessage: 'users could not be retrieved',
      });
    });
}

function getUser(req, res) {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        defaultErrMessage: 'user could not be retrieved',
      });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        defaultErrMessage: 'user could not be created',
      });
    });
}

function updateUserProfile(req, res) {
  const { _id } = req.user;
  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        defaultErrMessage: 'user profile could not be updated',
      });
    });
}

function updateUserAvatar(req, res) {
  const { _id } = req.user;
  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      sendError({
        res,
        err,
        defaultErrMessage: 'user avatar could not be updated',
      });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
