const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

module.exports = mongoose.model('users', userSchema);
