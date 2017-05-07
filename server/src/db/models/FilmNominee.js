var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var filmNomineeSchema = mongoose.Schema({
  category: { type: ObjectId, ref: 'Category' },
  nominee: { type: ObjectId, ref: 'Film' },
  is_winner: { type: Boolean, default: null },
  name: String,
  slug: String,
  type: String,
  votes: [{ type: ObjectId, ref: 'User' }],
  favorites: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('FilmNominee', filmNomineeSchema);
