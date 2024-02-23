import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/userContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Seats = () => {
  const {showId, movieId} = useParams();
    const {user, setUser} = useContext(UserContext)
    console.log("UserContext from Booking", user)
    
    const navigate = useNavigate();
    const [seats, setSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([])

    useEffect(() => {
      getSeats()
    },[])
    const getSeats = async() => {
      
      const seatsArray = await axios.get(`/customer/show/${showId}`, {withCredentials: true})
      console.log("Seats array", seatsArray)
      setSeats(seatsArray.data.Seats.sort())
    };

    const selectSeat = (seat) => {
      if (seat.status === 'booked'){
        alert("This seat is already taken")
      }else{
        if(selectedSeats.includes(seat.seat_name)){
          console.log("Seat exists in selected seats")
          const element = document.getElementById(seat.seat_name)
          element.classList.remove("seat-selected")
          element.classList.add("seat-vacant")
          const updatedSeats = selectedSeats.filter((selectedSeat) => {
            if (selectedSeat !== seat.seat_name){
              return true
            }
          })
          setSelectedSeats(updatedSeats)
        }else{
        const element = document.getElementById(seat.seat_name)
        element.classList.remove("seat-vacant")
        element.classList.add("seat-selected")
        setSelectedSeats([...selectedSeats, seat.seat_name])
        console.log("SeatArray", selectedSeats)
        }
        
      
      }
    }
   
    const bookMovie = async () => {
      // console.log("Data inside book movie", movieId, user.id, user.email, showId, selectedSeats)
      const bookingResponse = await axios.post(`/customer/bookings`, {
        movie_id: movieId,
        user_id: user.id,
        email: user.email, 
        show_id: showId, 
        seat_names: selectedSeats
      }, {withCredentials: true})
      console.log("Booking Response", bookingResponse)
      if (bookingResponse.status === 200){
        navigate(`/mybookings/${user.id}`)
      }

    }
    
    
  return (
    <div className='seats-container'>
      <div className='seat-container'>
     {
      seats.map((seat) => {
        return (
          <div className={`seat-${seat.status}`} id={seat.seat_name} onClick={() => {selectSeat(seat)}}>
      <p>{seat.seat_name}</p>
         </div>
        )
      })
     }
    </div>
    {
      selectedSeats.length > 0 
      && <button className='btn-book' onClick={bookMovie}>Book Now</button>
    }
    <div className='screen'>Screen This Way</div>
    </div>
  )
}

export default Seats