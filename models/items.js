const mongoose = require('mongoose')




const itemsSchema = new mongoose.Schema({
    imageUrl : {
        type : String,
        required: [true,"Please Enter news description"]
    },
    name: {
        type : String,
        lowerCase: true,
        required: [true,"Please Enter the title"],
        unique: true
    },
    
    price : {
        type : String,
        required: [true,"Please Enter name of author"],
    },
    amount: {
        type: String,
        required:[true, "Please Enter date"]
    }
})



const Items = mongoose.model('item', itemsSchema)

module.exports = Items;