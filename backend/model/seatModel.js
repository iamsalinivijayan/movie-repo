const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
    seat_name:{
        type: String,
        required: true
    },
    show:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Shows"
    },
    status:{
        type: String,
        required: true
    }
})

const SeatModel = mongoose.model("Seats", seatSchema)

module.exports = SeatModel