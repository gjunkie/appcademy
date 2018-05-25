const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let artistCategorySchema = mongoose.Schema({
  name: String,
  slug: String,
  slots: Number,
  nominees: [{
    type: ObjectId,
    ref: 'ArtistNominee'
  }],
});

module.exports = mongoose.model('ArtistCategory', artistCategorySchema);
