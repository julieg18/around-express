const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(val) {
        const regex = /^https?:\/\/(www\.)?\S+#?$/i;

        return regex.test(val);
      },
      message: 'invalid url',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('Card', cardSchema);
