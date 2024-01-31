const News = require('../models/news.js')
const Announcements = require('../models/announcements.js')
const Items = require('../models/items.js')
const User = require('../models/users.js')

let arr =async function(){
    const news = await  News.find({});
    const announcements = await Announcements.find({});
    const items = await Items.find({});
    const members = await User.find({});
    const val=[news,items,announcements,members]
    return val
}

module.exports.getNews = async(req,res)=>{
    const val = await arr()
    res.render('news',{ news: val[0],announcements: val[2], items: val[1], members: val[3] })}


module.exports.getAdNews =async (req,res)=>{
    const val = await arr()
    res.render('ad-news',{ news: val[0],announcements: val[2], items: val[1], members: val[3] })}

module.exports.getAdd = (req,res)=>{
    res.render('add')
}

module.exports.getSingleNews = async (req, res) => {
    const val = await arr()
    let foundNews = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundNews = element;
            return; 
        }
    });

    if (foundNews) {
        res.render('single-news', foundNews);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}


module.exports.getSingleAnnouncement = async (req, res) => {
    const val = await arr()
    let foundItem = null;

    val[2].forEach(element => {
        if (element.id == req.params.id) {
            foundItem = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundItem) {
        res.render('single-announcement', foundItem);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}

module.exports.verifyNewsDelete =async (req,res)=>{
    const val = await arr()
    let foundNews = null;
    

    val[0].forEach(element => {
        
        if (element.id == req.params.id) {
            foundNews = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundNews) {
        res.render('deleteNews', foundNews);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}

module.exports.verifyAnnDelete = async(req,res)=>{
    const val = await arr()
    let foundAnnouncement = null;

    val[2].forEach(element => {
        if (element.id == req.params.id) {
            foundAnnouncement = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundAnnouncement) {
        res.render('deleteAnnouncement', foundAnnouncement);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Announcement not found');
    }
}

module.exports.updateAnnouncement =  async (req, res) => {
    if (req.body && req.body.description ) {
        // Update the 'description' property
        const updatedData ={

        description : req.body.description,

        }

        const result = await Announcements.updateOne({ _id: req.params.id }, { $set: updatedData });

        if (result.modifiedCount === 0){
            res.status(404).send("<h2 style='color:red'>News Not Found</h2>")
            
        }

        // Send a response to the client indicating a successful update
        res.redirect('/ad');
    } else {
        // Handle case when 'description' property is missing in req.body
        res.status(400).send('Bad Request: Missing description in request body');
    }
}


module.exports.updateNews = async(req, res) => {

    
    // Check if req.body contains the 'description' property
    if (req.body && req.body.title && req.body.author && req.body.date && req.body.authorImg && req.body.all && req.body.description ) {
        // Update the 'description' property
        const updatedData ={

        description : req.body.description,
        title : req.body.title,
        imageUrl : req.body.image,
        author : req.body.author,
        date : req.body.date,
        authorImg : req.body.authorImg,
        total : req.body.all

        }

        const result = await News.updateOne({ _id: req.params.id }, { $set: updatedData });

        if (result.modifiedCount === 0){
            res.status(404).send("<h2 style='color:red'>News Not Found</h2>")
            
        }

        // Send a response to the client indicating a successful update
        res.redirect('/ad');
    } else {
        // Handle case when 'description' property is missing in req.body
        res.status(400).send('Bad Request: Missing description in request body');
    }
}


module.exports.deleteAnnouncement = async(req,res)=>{
    const result = await Announcements.deleteOne({ _id: req.params.id });
    res.redirect('/ad')
}

module.exports.deleteNews = async (req,res)=>{
    const result = await News.deleteOne({ _id: req.params.id });
    res.redirect('/ad')
}

module.exports.addNews = async (req,res)=>{
    console.log(req.body)
    try{
        
        const news = await News.create({
                                        description:req.body.description,
                                        title:req.body.title,
                                        imageUrl: req.body.image,
                                        author: req.body.author,
                                        date: req.body.date,
                                        authorImg: req.body.authorImg,
                                        total: req.body.all
                                        })
        res.redirect('/ad')
    
        }

    catch(err){
        console.log(err)
   
   
    }
}
module.exports.addAnnouncement = async (req,res)=>{
    console.log(req.body)
    try{
        const announcement = await Announcements.create({
                                        description:req.body.description,
                                        })
        res.redirect('/ad')
    
        }

    catch(err){
        console.log(err)
    }   
}