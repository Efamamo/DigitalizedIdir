
const mongoose = require('mongoose')

const memorialSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    deceasedDate: {
        type: Date,
        required: true
    },
    obituary: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
  
});

const Memorial = mongoose.model('memorial', memorialSchema);
module.exports = Memorial;