const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

module.exports = mongoose.model('Conversation', conversationSchema);
