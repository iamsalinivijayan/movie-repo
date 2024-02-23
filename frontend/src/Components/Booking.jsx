import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../Context/userContext'
import axios from 'axios'

const Booking = () => {
    const {userId, bookingId} = useParams()
    const navigate = useNavigate();
    console.log("User Id", userId)
    console.log("Booking Id", bookingId)
    const {user, setUser} = useContext(UserContext)
    const [booking, setBooking] = useState(null)

    const showBooking = async() => {
        console.log("Booking Id", bookingId)
        const booking = await axios.get(`/customer/bookings/${userId}/${bookingId}`, {withCredentials: true})
        setBooking(booking.data.Booking)
        console.log("Booking", booking.data.Booking)
    }

    const cancelBooking = async() => {
       console.log("booking id to cancel", bookingId)
       const showId = booking.show._id
       console.log("ShowId", showId)
        const deleted = await axios.delete(`/customer/bookings`, {withCredentials: true, data: {booking_id: bookingId,
        show_id: showId}})
        console.log("Booking Canceled", deleted)
        alert('Booking Canceled')
        navigate(`/mybookings/${userId}`)
    
    }


    useEffect(() => {
    showBooking()
    },[])

  return (
    <div className='movie-booking-container'> 
    {
        booking && 
       <div>
       <div className='movie-img-container'>
        <img alt='' src={booking.movie.image}/>
    </div>
     <h4 className='movie-name'> {booking.movie.movie_name}</h4>
     <p className='seats'>{booking.seats.join(',')}</p>
     <h5 className='show-time'>{booking.show.show_time}</h5>
     <h4 className='ticket-price'>{booking.movie.price * booking.seats.length} Rs</h4>
     <button className='btn-cancel' onClick={cancelBooking}>Cancel Booking</button>
       </div>
    }
    </div>
  )
}

export default Booking