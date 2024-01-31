const mongoose = require('mongoose')




const announcementSchema = new mongoose.Schema({
    description : {
        type : String,
        required: [true,"Please Enter announcement description"]
    }
})



const Announcements = mongoose.model('announcement', announcementSchema)

module.exports = Announcements;