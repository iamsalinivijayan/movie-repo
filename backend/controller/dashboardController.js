const Movies = require('../model/movieModel'); //importing model of movies
const Reviews = require('../model/reviewModel');
// display function to fetch movies from database for displaying movies on dashboard
const display = async(req, res) => {
    // fetching movies from db and sending the response as json
    const movies = await Movies.find()
    console.log("Movies", movies)
    const averageRatings = await Reviews.aggregate([
        {
          $group: {
            _id: '$movie',
            avg_rating: {
              $avg: '$rating'
            }
          }
        }
      ])
      console.log("Ratings", averageRatings)

      for (let movie of movies){
        for(let rating of averageRatings){
            if( movie._id.toString() === rating._id.toString()){
                movie.rating = rating.avg_rating
            }
        }
      }
      console.log("Movies", movies)
    res.status(200).json(movies)
}
// exporting the display function
module.exports = {display}