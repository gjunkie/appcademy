var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var filmCategorySchema = mongoose.Schema({
  name: String,
  nominees: [{
    type: ObjectId,
    ref: 'FilmNominee'
  }],
  slug: String,
  slots: Number,
});

module.exports = mongoose.model('FilmCategory', filmCategorySchema);
