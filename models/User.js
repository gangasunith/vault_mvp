const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  salt: String
});
module.exports = mongoose.model('User', userSchema);
