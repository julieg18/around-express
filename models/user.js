const mongoose = require('mongoose');
const { urlRegex } = require('../utils/utils');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  about: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(val) {
        return urlRegex.test(val);
      },
      message: 'invalid url',
    },
  },
});

module.exports = model('User', userSchema);
