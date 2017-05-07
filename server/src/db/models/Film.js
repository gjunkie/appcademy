var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var filmSchema = mongoose.Schema({
  budget: Number,
  genres: [{id: Number, name: String}],
  id: Number,
  imdb_id: String,
  nominations: [String],
  original_language: String,
  overview: String,
  poster_patch: String,
  production_companies: [{name: String, id: Number}],
  production_countries: [{iso_3166_1: String, name: String}],
  release_date: { type: Date, default: Date.now },
  revenue: Number,
  runtime: Number,
  slug: String,
  spoken_languages: [{iso_639_1: String, name: String}],
  tagline: String,
  title: String,
});

module.exports = mongoose.model('Film', filmSchema);
