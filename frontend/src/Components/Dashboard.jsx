import React, { useContext } from 'react'
import MovieList from '../Elements/MovieList'
import UserContext from '../Context/userContext'

const Dashboard = () => {

  const {user, setUser} = useContext(UserContext)
  console.log("Context from dashboard",user)

  return (
    <div>
      <MovieList/>
    </div>
  )
}

export default Dashboard