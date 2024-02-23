import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditMovie = () => {
    const {movieId} = useParams()
    const navigate = useNavigate()
    const [image, setImage] = useState('')
    const [movieData, setMovieData] = useState(null)
    const fetchMovie = async () => {
        const movie = await axios.get(`/customer/movies/${movieId}`, {withCredentials: true})
        console.log("Movie from edit movie", movie.data)
        setMovieData(movie.data)
    }
    useEffect(() => {
        fetchMovie()
    },[])

    const handleChange = (e) => {
        
        const {name, value} = e.target
        setMovieData({
            ...movieData,
            [name] : value
    })

    }

    const deleteMovie = async() => {

        const response = await axios.delete(`/admin/movie/${movieId}`, {withCredentials: true})
        
        if (response.status === 200){
            console.log("Movie Deleted", response)
            alert("Movie Deleted")
            navigate('/admin/dashboard')
        } else{
            alert('Something went wrong')
        }
    }
    const editMovie = async(e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('movie_name', movieData.movie_name )
        data.append('cast', movieData.cast)
        data.append('category', movieData.category)
        data.append('language', movieData.language)
        data.append('price', movieData.price)
        data.append('file', image[0])

        const response = await axios.put(`/admin/movie/${movieId}`, data, {withCredentials: true, headers: {
            "Content-Type": 'multipart/form-data'
        }})

        if(response.status === 200) {
            console.log("Movie updated", response)
            alert("Movie Updated")
            navigate('/admin/dashboard')
        }else {
            alert("Something went Wrong")
        }

    }
  return (
    <div className='edit-movie-container'>
        {
            movieData && 
        <div>
        <form className='edit-movie-form' onSubmit={editMovie}>
        <input className='movie-image' placeholder='Movie image' name='movieImage' type='file' onChange={(e) => {setImage(e.target.files)}}/>
        <input className='movie-name' placeholder='Movie name' name='movieName' value={movieData.movie_name} type='text' onChange={handleChange}/>
        <input className='cast' placeholder='Cast members (comma seperated)' name='cast' value={movieData.cast} type='text' onChange={handleChange} />
        <input className='category' placeholder='Category' name='category' value={movieData.category} type='text' onChange={handleChange}/>
        <input className='language' placeholder='Language' name='language' value={movieData.language} type='text' onChange={handleChange}/>
        <input className='price' placeholder='Ticket Price' name='price' value={movieData.price} type='number'onChange={handleChange}/>
        <button className='edit-movie-btn' type='submit'>Update</button>
        </form>
        <button className='delete-movie-btn' onClick={deleteMovie}>Delete</button>
        </div>
        }
    </div>
  )
}

export default EditMovie