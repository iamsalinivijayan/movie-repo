const Booking = require('../model/bookingModel'); // importing Booking collection from bookingModel
const Seats = require('../model/seatModel'); // importing Seats collection
const nodemailer = require('nodemailer'); //importing nodemailer for sending email as booking response
const Shows = require('../model/showModel');

// get all shows for a movie
const getShows = async(req, res) => {
    console.log("inside get shows", req.params)
    const {_movie_id} = req.params
    console.log("Request", req.params)

    const shows = await Shows.find({movie: _movie_id})
    console.log("Shows fetched", shows)
    res.status(200).json({"Shows": shows})
}

// get all seats from a show
const getSeats = async(req, res) => {
    const {_show_id} = req.params

    const seats = await Seats.find({show: _show_id})

    res.status(200).json({"Seats": seats})
}


// For creating booking
const createBooking = async(req,res) => {
    console.log("Request body booking controller", req.body)
    const {movie_id, user_id, email, show_id, seat_names} = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: 'itssalinivijayan@gmail.com',
            pass: "gtfedjedfzggvcdg",
        }
    });
    
    const seats = await Seats.find({show: show_id, status: "booked"})
    const seats_booked = seats.map((seat) => {
        return seat.seat_name
    })
    let seatsNotAvailable = 0
    for (let i of seat_names){
        if (seats_booked.includes(i)){
            seatsNotAvailable ++ 
        }
    }
    if (seatsNotAvailable === 0){
        for(let seat of seat_names){
            const updated = await Seats.findOneAndUpdate({show: show_id, seat_name: seat}, {status: "booked"})
            console.log("Updated", updated)
        }
        const booking = await Booking.create({
            movie: movie_id,
            user: user_id,
            show: show_id,
            seats: seat_names,
            count: seat_names.length,
            date: new Date().toISOString().slice(0, 10)
    
        })
        const bookingMail = {
            from: "itssalinivijayan@gmail.com",
            to: email,
            subject: "Movie Booking",
            text: `Hello, your booking is completed. Have a nice day`
        };
        transporter.sendMail(bookingMail, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent: "+ info.response);
            }
        });
        console.log("Booking", booking)
        res.status(200).json({message: "Booking done"})
    }else{
        res.status(200).json({"message": "Some seats are already taken"})
    }

}

// get all bookings of user
const getAllBookings = async(req, res) => {
    console.log("params booking controller", req.params)
    const {_id} = req.params
    const bookings = await Booking.find({user: _id})
    .populate("movie", ["movie_name", "image", "price"])
    console.log("Bookings of user", bookings)
    res.status(200).json({Bookings: bookings})

}
// To get single booking 
const getBooking = async(req, res) => {
    console.log("request params get booking", req.params)
    const {_booking_id} = req.params

    const booking = await Booking.findById(_booking_id)
    .populate("movie", ["movie_name", "image", "price"])
    .populate("show", ["show_time", "show_date"])

    console.log("Booking with total", booking)
    res.status(200).json({"Booking": booking})

}

// To delete booking
const deleteBooking = async(req, res) => {
    const {booking_id, show_id} = req.body
    console.log("Request", req.body)
    const booking = await Booking.findById(booking_id)
    const seats = booking.seats
    for(let seat of seats){
        const updated = await Seats.findOneAndUpdate({show: show_id, seat_name: seat}, {status: "vacant"})
        console.log("Updated", updated)
    }
    const cancelBooking = await Booking.findByIdAndDelete(booking_id)
    res.status(200).json({"Booking Deleted": cancelBooking})


}

module.exports = {getShows, getSeats, createBooking, getAllBookings, getBooking, deleteBooking}