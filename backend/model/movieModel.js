// Importing the 'mongoose' library for MongoDB schema and model creation
const mongoose = require('mongoose');

// Defining movie schema using the 'mongoose.Schema' constructor
const movieSchema = new mongoose.Schema({
  // Movie name
  movie_name: {
    type: String,
    required: true,
    index: true
  },
  // Cast details
  cast:{
    type: String
  },
  // movie category (UA, A, PG)
  category: {
    type: String,
    required: true,
  },
//   Language of the movie(Malayalam, Hindi, Tamil, Telgu, English)
  language:{
    type:String,
  },
  image:{
    type: String
  },
  rating:{
    type: Number
  },
  price:{
    type: Number
  }
});

// Creating a model using the schema
const Movies = mongoose.model('Movies', movieSchema);

// Exporting the 'Movies model to be used in other parts of the application
module.exports = Movies;
