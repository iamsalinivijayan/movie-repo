import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import MoviesPage from '../Elements/MoviesPage'
import UserContext from '../Context/userContext'

const AdminDashboard = () => {
  const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const handleAddMovie = () => {
        navigate('/admin/addmovie')
    }
    
  return (
    <div className='admin-dashboard'>
        {
          user.isAdmin && 
          <div className='add-movie' onClick={handleAddMovie}> Add Movie</div>
        }
        <MoviesPage/>
    </div>
  )
}

export default AdminDashboard