// Importing necessary dependencies and components from react-router-dom
import React, { useState, useEffect, useContext } from 'react'; // React core library and hooks
import MovieCard from './MovieCard'; // Custom MovieCard component
import { Link } from '@material-ui/core'; // Material-UI Link component for navigation
import axios from 'axios';
import UserContext from '../Context/userContext';
import { useNavigate } from 'react-router-dom';

// Main functional component for rendering a list of movies
const MoviesPage = () => {
  const {user, setUser} = useContext(UserContext)
  console.log("Context from dashboard",user)
  // State to hold the list of movies
  const [movies, setMovies] = useState([]);
  const [soldTickets, setSoldTickets] = useState(null)

  const navigate = useNavigate()

  const fetchMovies = async() => {
    const response = await axios.get('/admin/movie', {withCredentials: true})
    console.log("Fetched movies:",response.data.movies)
    console.log(response.status)
      setMovies(response.data.Movies)
      setSoldTickets(response.data.SeatsSold)

  }

  const editMovie = (movie_id) => {
    navigate(`/admin/movie/${movie_id}`)
  }

  const getShows = (movie_id) => {
    navigate(`/admin/shows/${movie_id}`)
  }

  // Effect hook to fetch movies from the API when the component mounts
  useEffect(() => {
    // Fetch movies from the API
    fetchMovies()
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // JSX rendering of the MovieList component
  return (
     <div className='admin-movie-list-container'>
     {soldTickets !== null && <h4>{`Tickets sold today: ${soldTickets}`}</h4>}
      <div className='movie-card-container'>
     { movies.map((movie) => {
        return (
        <div className='movie-card'>
        <img alt='' className='image' src={`${process.env.REACT_APP_AXIOS_BASE_URL}/${movie.image}`}/>
        <h4 className='movie-name'>{movie.movie_name}</h4>
        <p className='language'>Language: {movie.language}</p>
        <p className='category'>Category: {movie.category}</p>
        <p className='rating'>Rating: {movie.rating}</p>
        <button className='edit-movie' onClick={() => editMovie(movie._id)}>Edit Movie</button>
        <button className='shows' onClick={() => getShows(movie._id)}>View Shows</button>
        </div>
        )
        
     })
     }   
        
     </div>
     </div>
  );
};

// Exporting the MovieList component for use in other parts of the application
export default MoviesPage;
