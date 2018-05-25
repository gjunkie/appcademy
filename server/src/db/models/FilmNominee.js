const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let filmNomineeSchema = mongoose.Schema({
  is_winner: { type: Boolean, default: null },
  name: String,
  nomination: [{
    category: { type: ObjectId, ref: 'Category' },
    artist: { type: ObjectId, ref: 'Artist' }
  }],
  slug: String,
  type: String,
  votes: [{ type: ObjectId, ref: 'User' }],
  favorites: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('FilmNominee', filmNomineeSchema);
