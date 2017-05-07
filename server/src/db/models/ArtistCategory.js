var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var artistCategorySchema = mongoose.Schema({
  name: String,
  slug: String,
  slots: Number,
  nominees: [{
    type: ObjectId,
    ref: 'ArtistNominee'
  }],
});

module.exports = mongoose.model('ArtistCategory', artistCategorySchema);
