import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  id: String,
  creationDate: { type: Date, required: true, default: Date.now },
  email: String,
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  games: [{
    type: ObjectId,
    ref: 'Game',
  }],
});

module.exports = mongoose.model('User', userSchema);
