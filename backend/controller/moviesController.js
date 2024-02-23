const Movies = require('../model/movieModel'); //Importing model of movies
const Reviews = require('../model/reviewModel'); //Importing the review model
const mongoose = require('mongoose')

// function to fetch a particular movie
const getMovie = async (req, res) => {
  try {
    console.log(req.params)
    const movieId = req.params._id;
    const target_movie = new mongoose.Types.ObjectId(movieId)
    console.log("Target movie", target_movie)
    const average = await Reviews.aggregate([
      {
        $match: {
          movie: target_movie
        }
      },
      {
        $group: {
          _id: '$movie',
          avg_rating: {
            $avg: '$rating'
          }
        }
      }
    ])
    console.log("Average", average)
    if (!movieId) {
      return res.status(400).json({ message: 'Invalid movieId' });
    }
    console.log('Movie ID:', movieId); // Log the movieId on the server side
    const movie = await Movies.findById(movieId);
    console.log('Movie Details:', movie); // Log the movie details
    movie.rating = average[0]?.avg_rating ? average[0].avg_rating : 0
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// function to add review
const addReview = async(req, res) => {
  const {review, user_id, movie_id, rating} = req.body
  console.log("request", req.body)
  // console.log("user id", user_id)
  let reviewExists = 0
  const reviews = await Reviews.find({user: user_id})
  // console.log("reviews of user", reviews)
  const existingReviews = reviews.map((reviewItem) => {
    return reviewItem.movie
  })
  // console.log("Existing Reviews", existingReviews)
  for(let movie of existingReviews){
    if (movie == movie_id){
      reviewExists ++
    }
  }
  console.log("Flag", reviewExists)
  if (reviewExists === 0){
    const movieReview = await Reviews.create({
      review: review,
      rating: rating,
      user: user_id,
      movie: movie_id
    })
    res.status(200).json({review: "Review is added"})
  }else{
    res.status(200).json({review: "You have already reviewed this movie"})
  }
  }

// Function to get All reviews
const getReviews = async(req, res) => {
  console.log("Request", req.params)
  const {_id} = req.params._id
  const reviews = await Reviews.find(_id)
  res.status(200).json({Reviews: reviews})
}

// Function to edit review
const editReview = async(req, res) => {
  const {_id} = req.params
  const {review} = req.body
  
  const updatedReview = await Reviews.findByIdAndUpdate(_id, {review: review}, { returnDocument: 'after' })
  res.status(200).json({"Review updated": updatedReview})
}
// Function to Delete review
const deleteReview = async(req, res) => {
  const {_id} = req.params

  const deletereview = await Reviews.findByIdAndDelete(_id)
  console.log("Deleted", deletereview)
  res.status(200).json({"Message":"review deleted"})
}



// Exporting the functions 
module.exports = {getMovie, addReview, getReviews, editReview, deleteReview}
