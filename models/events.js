const mongoose = require('mongoose')




const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true,"Please Enter Event Title"]
    },
    date: {
        type : Date,
        required: [true,"Please Enter the date"]
    },
    
    description : {
        type : String,
        required: [true,"Please Enter Event's description"],
    }
})



const Events = mongoose.model('event', eventSchema)

module.exports = Events;