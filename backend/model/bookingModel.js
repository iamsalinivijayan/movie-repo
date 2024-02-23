// Importing the 'mongoose' library for MongoDB schema and model creation
const mongoose = require('mongoose');

// Defining booking schema using the 'mongoose.Schema' constructor
const bookingSchema = new mongoose.Schema({
    // movie id as reference of Movies collection
    movie: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movies",
    },
    // user id as reference of Users collection
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    seats:{
        type: [String]
    },
    date:{
        type: Date
    },
    count:{
        type: Number
    },
    show: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Shows"
    }
    },
    // Time stamps
    {
        timestamps: true,
      }
    )

    // Creating a model using the schema
    const bookingModel = mongoose.model('Booking', bookingSchema)
    // Exporting the 'booking model to be used in other parts of the application
    module.exports = bookingModel

