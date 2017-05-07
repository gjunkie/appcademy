var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var artistNomineeSchema = mongoose.Schema({
  is_winner: { type: Boolean, default: null },
  name: String,
  nomination: [{
    category: { type: ObjectId, ref: 'Category' },
    film: { type: ObjectId, ref: 'Film' },
  }],
  slug: String,
  type: String,
  votes: [{ type: ObjectId, ref: 'User' }],
  favorites: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('ArtistNominee', artistNomineeSchema);
