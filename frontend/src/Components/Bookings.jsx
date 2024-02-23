import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/userContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Bookings = () => {
    const {userId} = useParams();
    console.log("UserId", userId)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState([]);

    const getBookings = async() => {
        console.log("User", user)
        const allBookings = await axios.get(`/customer/bookings/${userId}`, {withCredentials: true})
        console.log("Fetched bookings", allBookings)
        setBookings(allBookings.data.Bookings)
    }

    const getBooking = async(bookingId) => {

        console.log("Booking id", bookingId)
        const booking = await axios.get(`/customer/bookings/${userId}/${bookingId}`, {withCredentials: true})
        console.log("Booking from get booking", booking)
        setBooking(booking)
        navigate(`/mybookings/${userId}/${bookingId}`)
    }

    useEffect(() => {
        getBookings()
    },[])
  return (
    <div className='booking-container'>
    { bookings.map((booking) => {
        return (
            <div className='booking-card'>
                <div className='booking-img'><img alt='' src= {booking.movie.image} /></div>
                <p className='movie-name'>{booking.movie.movie_name}</p>
                <p className='movie-price'>{booking.seats.length * booking.movie.price} Rs</p>
                <button className='btn-get-booking' onClick={() => getBooking(booking._id)}>View Booking</button>
            </div>
        )
    })

    }
    </div>
  )
}

export default Bookings