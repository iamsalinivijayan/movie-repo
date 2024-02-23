// Importing necessary dependencies and components from react-router-dom
import React, { useState, useEffect, useContext } from 'react'; // React core library and hooks
import MovieCard from './MovieCard'; // Custom MovieCard component
import { Link } from '@material-ui/core'; // Material-UI Link component for navigation
import axios from 'axios';
import UserContext from '../Context/userContext';

// Main functional component for rendering a list of movies
const MovieList = () => {
  const {user, setUser} = useContext(UserContext)
  console.log("Context from dashboard",user)
  // State to hold the list of movies
  const [movies, setMovies] = useState([]);

  const fetchMovies = async() => {
    const response = await axios.get('/customer/dashboard', {withCredentials: true})
    console.log("Fetched movies:",response)
    console.log(response.status)
      setMovies(response.data)
  }
  // Effect hook to fetch movies from the API when the component mounts
  useEffect(() => {
    // Fetch movies from the API
    fetchMovies()
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // JSX rendering of the MovieList component
  return (
    <div style={{ paddingTop: '10px', paddingLeft: '2%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
      {/* Map through the array of movies and create a Link for each one */}
      {movies.map((movie) => (
        <Link to={`/customer/movies/${movie._id}`} key={movie._id}>
          {/* Render a MovieCard component for each movie */}
          <MovieCard
            user_id={user.id}
            movie_id = {movie._id}
            movie_name={movie.movie_name}
            image={movie.image}
            category={movie.category}
            language={movie.language}
            rating={movie.rating}
          />
        </Link>
      ))}
    </div>
  );
};

// Exporting the MovieList component for use in other parts of the application
export default MovieList;
