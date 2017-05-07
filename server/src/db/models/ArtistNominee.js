var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var artistNomineeSchema = mongoose.Schema({
  category: { type: ObjectId, ref: 'Category' },
  nominee: { type: ObjectId, ref: 'Artist' },
  is_winner: { type: Boolean, default: null },
  name: String,
  slug: String,
  type: String,
  votes: [{ type: ObjectId, ref: 'User' }],
  favorites: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('ArtistNominee', artistNomineeSchema);
