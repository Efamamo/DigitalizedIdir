const mongoose = require('mongoose')




const newsSchema = new mongoose.Schema({
    description : {
        type : String,
        required: [true,"Please Enter news description"]
    },
    title: {
        type : String,
        required: [true,"Please Enter the title"],
    },
    imageUrl : {
        type : String,
        required: [true,"Please Enter image URL"],
    },
    author : {
        type : String,
        required: [true,"Please Enter name of author"],
    },
    date: {
        type : Date,
        required: [true,"Please Enter the date"]
    },
    authorImg: {
        type: String,
        required:[true, "Please Enter authors Imge url"]
    },
    total: {
        type: String,
        required:[true, "Please Enter whole news"]
    }
})





const News = mongoose.model('new', newsSchema)

module.exports = News;