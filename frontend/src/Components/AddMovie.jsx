import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddMovie = () => {

    const navigate = useNavigate()

    const [movieData, setMovieData] = useState({
        movieName: '',
        cast: '',
        category: '',
        language: '', 
        price: ''
    })
    const [image, setImage] = useState('')

    const addMovie = async (e) => {
    e.preventDefault()
        const data = new FormData()
        data.append('movie_name', movieData.movieName )
        data.append('cast', movieData.cast)
        data.append('category', movieData.category)
        data.append('language', movieData.language)
        data.append('price', movieData.price)
        data.append('file', image[0])

        const response = await axios.post('/admin/movie', data, {withCredentials: true, headers: {
            "Content-Type": 'multipart/form-data'
        }})
        console.log("Add movie response", response)
        if( response.status === 200) {
            alert("Added Movie")
            navigate('/admin/dashboard')
        }else{
            alert('Something went wrong')
        }
        


    }

    const handleChange = async (e) => {
        const {name, value} = e.target
        setMovieData({
            ...movieData,
            [name] : value
    })
    }

  return (
    <div className='add-movie-container'>
        <h3 className='page-title'> Add Movie </h3>
        <form className='add-movie-form' onSubmit={addMovie}>
        <input className='movie-image' placeholder='Movie image' name='movieImage' type='file' onChange={(e) => {setImage(e.target.files)}}/>
        <input className='movie-name' placeholder='Movie name' name='movieName' value={movieData.movieName} type='text' onChange={handleChange}/>
        <input className='cast' placeholder='Cast members (comma seperated)' name='cast' value={movieData.cast} type='text' onChange={handleChange} />
        <input className='category' placeholder='Category' name='category' value={movieData.category} type='text' onChange={handleChange}/>
        <input className='language' placeholder='Language' name='language' value={movieData.language} type='text' onChange={handleChange}/>
        <input className='price' placeholder='Ticket Price' name='price' value={movieData.price} type='number'onChange={handleChange}/>
        <button className='add-movie-btn' type='submit'>Add Movie</button>
        </form>
    </div>
  )
}

export default AddMovie