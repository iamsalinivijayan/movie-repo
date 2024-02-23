const express = require('express'); //importing express
const { addShow, addMovie, editMovie, deleteMovie, getMovies, deleteShow, soldTickets } = require('../controller/adminController'); //importing functions from admin controller
const router = express.Router(); // Creating an instance of express router

// route to add show 
router.route('/addshow').post(addShow)
// route to show booked seats
router.route('/seatsbooked').post(soldTickets)
// route to delete show
router.route('/deleteshow/:_id').delete(deleteShow)
// route to add movie
router.route('/movie').post(addMovie).get(getMovies)
// route to edit and delete movies
router.route('/movie/:_id').put(editMovie).delete(deleteMovie)


// exporting router to be used in other parts 
module.exports = router
