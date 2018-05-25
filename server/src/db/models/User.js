const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  creationDate: { type: Date, required: true, default: Date.now },
  score: Number,
  color: String,
  games: [{
    type: ObjectId,
    ref: 'Game'
  }]
});

module.exports = mongoose.model('User', userSchema);
