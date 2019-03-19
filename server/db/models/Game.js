const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const gameSchema = mongoose.Schema({
  id: String,
  creationDate: { type: Date, required: true, default: Date.now },
  inviteCode: { type: String, required: true },
  players: { type: Array, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
