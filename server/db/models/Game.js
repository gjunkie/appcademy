import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const gameSchema = mongoose.Schema({
  id: String,
  creationDate: { type: Date, required: true, default: Date.now },
  inviteCode: { type: String, required: true },
  players: [{
    type: ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Game', gameSchema);
