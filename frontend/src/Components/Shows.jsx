import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Shows = () => {
  const navigate = useNavigate()
  const {movieId} = useParams();
  console.log("MovieId", movieId)

  const [shows, setShows] = useState([])

  useEffect(()=> {
    getShows();
   },[]) 
  const getShows = async () => {
    const shows = await axios.get(`/customer/movie/${movieId}`, {withCredentials: true})
    setShows(shows.data.Shows)
    console.log("Shows from getShows", shows)
  }

  const selectShow = (show_id, movie_id) => {
    navigate(`/show/${show_id}/${movie_id}`)
  }
  

  return (

    <div className='show-tile-container'>
      {shows.map((show) => { 
      return (
        <div className='show-tile'>
        <h3 className='show-date'> {show.show_date.slice(0, 10)}</h3>
        <h3 className='show-time'> {show.show_time}</h3>
        <button className='select-show-btn' onClick={ () => selectShow(show._id, show.movie)}> Select Show</button>
      </div>
      )
      })}
    </div>
  )
}

export default Shows