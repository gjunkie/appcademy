var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var filmNomineeSchema = mongoose.Schema({
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
