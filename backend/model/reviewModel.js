const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    movie:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movies"
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
    
},
{
    timestamps: true
})

const ReviewModel = mongoose.model("Reviews", reviewSchema)

module.exports = ReviewModel