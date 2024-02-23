const mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    show_time:{
        type: String,
        required: true
    },
    movie:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movies"
    },
    show_date:{
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

const ShowModel = mongoose.model("Shows", showSchema)

module.exports = ShowModel