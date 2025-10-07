const mongoose = require('mongoose');
const vaultItemSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  username: String,
  password: String,
  url: String,
  notes: String
});
module.exports = mongoose.model('VaultItem', vaultItemSchema);
