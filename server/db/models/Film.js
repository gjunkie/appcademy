import mongoose from 'mongoose';

// const { ObjectId } = mongoose.Schema.Types;

const filmSchema = mongoose.Schema({
  filmId: String,
  creationDate: { type: Date, required: true, default: Date.now },
  nominations: [],
  overview: String,
  posterPath: String,
  releaseDate: String,
  title: String,
});

module.exports = mongoose.model('Film', filmSchema);
