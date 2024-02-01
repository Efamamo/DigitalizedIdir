const jwt = require('jsonwebtoken')
const User = require('../models/users')

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token,"mysecret",(err)=>{
            if (err){
                res.redirect("/login")
            }
            else{
                next()
            }
        })
    }
    else{
        res.redirect("/login")
    }
}


const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt

    if (token){
        jwt.verify(token,"mysecret", async (err,decodedToken)=>{
            if (err){
                res.locals.user = null;
                console.log(err)
                next()
            }
            else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next()
            }
        })
    }
    else{
        res.locals.user = null;
        next()
    }
    
}


module.exports = {requireAuth,checkUser}