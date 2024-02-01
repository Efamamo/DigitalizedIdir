const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')



const userSchema = new mongoose.Schema({
    phone: {
        type: String,
    },
    username : {
        type : String,
        required: [true,"Please Enter username"]
    },
    email: {
        type : String,
        required: [true,"Please Enter email address"],
        unique: true,
        lowercase: true,
        validate: [isEmail,"Please enter valid email address"]
    },
    password : {
        type : String,
        required: [true,"Please Enter password"],
        minlength: [6, "Minimum password length is 6 characters"]
    },
    address : {
        type : String,
        required: [true,"Please Enter address"],
    },
    role: {
        type: String,
        required:[true, "Please Enter Role"]
    },
    notifications: [{ type: String }]
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()

    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if (user){
        const auth = await bcrypt.compare(password,user.password)
        if (auth){
            return user
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect email")
}

const User = mongoose.model('user', userSchema)

module.exports = User;