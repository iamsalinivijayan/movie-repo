// Importing Material-UI components for creating a card
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Review from './Review'; // element for movie reviews
import Movie from './Movie'; // element for movie details
import { useNavigate } from 'react-router-dom'; //importing usenavigate hook to navigate through pages

// Functional component to render a card for a movie
const MovieCard = ({ movie_id, movie_name, image, category, language, rating, user_id }) => {
  const navigate = useNavigate()
 
  const getShows = (movieId) => {
    console.log("movieId", movieId)
    navigate(`/shows/${movieId}`)
  };
  // JSX rendering of the MovieCard component
  return (
    <Card style={{ margin: '5px', width: '200px', height: '520px'}}>
      {/* Displaying the movie image as a card media */}
      <CardMedia className='movie-img' component="img" alt={movie_name} image={`${process.env.REACT_APP_AXIOS_BASE_URL}/${image}`} />
      <CardContent>
        {/* Displaying movie details using Typography components */}
        <Typography className='movie-title' variant="h6">{movie_name}</Typography>
        <Typography className='movie-category' variant="body2" color="textSecondary">
          Category: {category}
        </Typography>
        <Typography className='movie-lang' variant="body2" color="textSecondary">
          Language: {language}
        </Typography>
        <Typography className='movie-rating' variant="body2" color="textSecondary">
          Rating: {rating}
        </Typography>
        
        {/* Additional custom components for movie details, bookings, and reviews */}
        <Movie movie_id={movie_id}/> {/* Movie informations in a more detailed way */}
        <Review movieId = {movie_id} userId = {user_id} /> {/* Renders reviews for the movie */}
        {/* Handles movie bookings */}
        <button className='btn-shows'  onClick={() => getShows(movie_id)}>
        Shows
        </button> 
      </CardContent>
    </Card>
  );
};

// Exporting the MovieCard component for use in other parts of the application
export default MovieCard;
