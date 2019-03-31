import mongoose from 'mongoose';

const artistSchema = mongoose.Schema({
  entityId: String,
  creationDate: { type: Date, required: true, default: Date.now },
  nominations: [],
  name: String,
  profilePath: String,
});

module.exports = mongoose.model('Artist', artistSchema);
