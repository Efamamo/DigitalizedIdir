const User = require('../models/users')
const jwt = require('jsonwebtoken')

const handleErrors = (err)=>{
    const error = {email : "", password: "", username: "", address:"",role:""}
    console.log(err.message)

    if (err.message === "Incorrect email"){
        error.email = "No account with the given email"
    }

    if (err.message === "Incorrect password"){
        error.password = "Incorrect password"
    }
    if (err.code === 11000){
        error.email = 'email already in use'
        return error

    }

    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message
        })
        
    }

    return error
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id)=>{
    return jwt.sign({id}, "mysecret",{expiresIn: maxAge})
}

module.exports.getSignup = (req,res)=>{
    res.cookie('jwt','',{maxAge: 1})
    res.render('signup')}

module.exports.getLogin = (req,res)=>{
    res.cookie('jwt','',{maxAge: 1})
    res.render('login')
}

module.exports.postLogin = async (req,res)=>{

    const {email,password} = req.body
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true, maxAge : (maxAge*1000)})
        res.status(200).json({user:user._id})
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}


module.exports.postSignup = async (req,res)=>{
    const {email,username,password,address,role,phone} = req.body
    console.log(req.body)
    try{
        const user = await User.create({ email,password,username,address,role,phone })
        const token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true, maxAge : (maxAge*1000)})
        res.status(200).json({user:user._id})
    
    }

    catch(err){
        const error = handleErrors(err)
        console.log(error)
        res.status(400).json({error})
    }
}

module.exports.logout = (req,res)=>{
    res.cookie('jwt','',{maxAge: 1})
    
    res.redirect("/")
}