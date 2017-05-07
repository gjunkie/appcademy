var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var artistSchema = mongoose.Schema({
  biography: String,
  birthday: { type: Date, default: Date.now },
  gender: Number,
  id: Number,
  imdb_id: String,
  name: String,
  nominations: [{
    category: String,
    film: { type: ObjectId, ref: 'Film' }
  }],
  place_of_birth: String,
  profile_path: String,
  slug: String,
});

module.exports = mongoose.model('Artist', artistSchema);
