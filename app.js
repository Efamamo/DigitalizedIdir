const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const news = require('./routes/newsRoutes.js')
const auth =require('./routes/authRoutes.js')
const items = require('./routes/itemRoutes.js')
const home = require("./routes/homeRoute.js")
const memorial = require("./routes/memorialRoute.js")
const members = require("./routes/membersRouth.js")

const app = express()

app.use(express.static('./views'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.set('view engine','ejs')
app.use(cookieParser())

const password = encodeURIComponent('#Mini555');
const dbURL = `mongodb+srv://ephrem:${password}@cluster0.jmukl7n.mongodb.net/Digitalized-Idir`
mongoose.connect(dbURL)
    .then((result)=> app.listen(3000))
    
    .catch((err)=> console.log(err));

app.post('/items/rent',(req,res)=>{
    console.log(req.body)
    res.redirect("items")
})

app.use(news)
app.use(auth)
app.use(items)
app.use(home)
app.use(memorial)
app.use(members)