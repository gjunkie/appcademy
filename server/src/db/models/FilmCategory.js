const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let filmCategorySchema = mongoose.Schema({
  name: String,
  nominees: [{
    type: ObjectId,
    ref: 'FilmNominee'
  }],
  slug: String,
  slots: Number,
});

module.exports = mongoose.model('FilmCategory', filmCategorySchema);
