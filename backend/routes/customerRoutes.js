const express = require('express'); // importing express
const {display} = require('../controller/dashboardController'); //importing functions from dashboard controller
const {getMovie, addReview, editReview, deleteReview, getReviews} = require('../controller/moviesController'); //importing functions from movies controller
const {createBooking, getAllBookings, getBooking, deleteBooking, getSeats, getShows} = require('../controller/bookingController'); //import functions from booking controller
const router = express.Router(); // creating an instance of express router

// route for dashboard
router.route('/dashboard').get(display)
// routes for movies page
router.route('/movies/:_id').get(getMovie)
router.route('/movies/review').post(addReview)
router.route('/movies/review/:_id').put(editReview).delete(deleteReview).get(getReviews)
// routes for bookings page
router.route('/bookings').post(createBooking).delete(deleteBooking)
router.route('/show/:_show_id').get(getSeats)
router.route('/movie/:_movie_id').get(getShows)
router.route('/bookings/:_id').get(getAllBookings)
router.route('/bookings/:_user_id/:_booking_id').get(getBooking)



// exporting the router to be used in other parts 
module.exports = router