import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddShow = () => {

  const {movieId} = useParams()

  const navigate = useNavigate()

  const [showData, setShowData] = useState({
    show_time: '',
    show_date: '',
    number_of_seats: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
        setShowData({
            ...showData,
            [name] : value
  })
}

const addShow = async(e) => {
  e.preventDefault()

  const show = await axios.post('/admin/addshow', {
    show_time: showData.show_time,
    show_date: showData.show_date,
    number_of_seats: showData.number_of_seats,
    movie_id: movieId
  }, {withCredentials: true})

  console.log("Show response", show)

  if (show.status === 200) {
    alert("Show Added")
    navigate(`/admin/shows/${movieId}`)
  }else{
    alert("Something went wrong")
  }
}

  return (
    <div className='add-show-container'>
    <h4 className='page-title'>Add Show</h4>
    <form className='add-show-form' onSubmit={addShow}>
    <input className='show-time' placeholder='Show time' name='show_time' value={showData.show_time} type='text' onChange={handleChange}/>
    <input className='show-date' placeholder='Date (YYYY-MM-DD)' name='show_date' value={showData.show_date} type='date' onChange={handleChange}/>
    <input className='number-of-seats' placeholder='Number of seats' name='number_of_seats' value={showData.number_of_seats} type='number' onChange={handleChange}/>
    <button className='add-show-btn' type='submit'>Add show</button>
    </form>
    </div>
  )
}

export default AddShow