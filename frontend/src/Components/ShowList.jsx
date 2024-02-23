import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ShowList = () => {
  const navigate = useNavigate()
  const {movieId} = useParams();
  console.log("MovieId", movieId)

  const [shows, setShows] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(()=> {
    getShows();
   },[refresh]) 

  const getShows = async () => {
    const shows = await axios.get(`/customer/movie/${movieId}`, {withCredentials: true})
    setShows(shows.data.Shows)
    console.log("Shows from getShows", shows)
  }

  const deleteShow = async (show_id) => {
    const show = await axios.delete(`/admin/deleteshow/${show_id}`, {withCredentials: true})

    console.log("Deleted show", show)
    if(show.status === 200) {
      alert("Show deleted")
      setRefresh(true)
    }else{
      alert("Something went wrong")
    }

  }

  const addShow = () => {
    navigate(`/admin/addshow/${movieId}`)
  }
 
  return (
    <div className='show-container'>
    <button className='add-show' onClick={addShow}>Add show</button> 
    <div className='show-tile-container'>
      {shows.map((show) => { 
      return (
        <div className='show-tile'>
        <h3 className='show-date'> {show.show_date.slice(0, 10)}</h3>
        <h3 className='show-time'> {show.show_time}</h3>
        <button className='delete-show-btn' onClick={() => deleteShow(show._id)}>Delete Show</button>
      </div>
      )
      })}
    </div>
    </div>
  )
}

export default ShowList