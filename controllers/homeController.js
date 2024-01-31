const Events = require('../models/events')
const Users = require('../models/users')

let arr =async function(){
    const events = await  Events.find({});
    const val=[events]
    return val
}

module.exports.getHome = async (req,res)=>{
    val = await arr()
    res.render('home',{events:val[0]})
}

module.exports.getEventAdd = (req,res)=>{
    res.render("addEvent")
}

module.exports.addEvent = async (req,res)=>{
    console.log(req.body)
    try{
        const events = await Events.create({
                                        title:req.body.title,
                                        date:req.body.date,
                                        description: req.body.description
                                        })
        res.redirect('/home')
    
        }

    catch(err){
        console.log(err)
    }
    
}

module.exports.setting = (req,res)=>{
    res.render('setting')
}

module.exports.getSingleEvent = async (req, res) => {
    const val = await arr()
    let foundEvent = null;
    

    val[0].forEach(element => {
        console.log(element.date.toString().slice(0,10))
        if (element.id == req.params.id) {
            foundEvent = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundEvent) {
        res.render('singleEvent', foundEvent);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}

module.exports.verifyEventDelete = async(req,res)=>{
    const val = await arr()
    let foundEvent = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundEvent = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundEvent) {
        res.render('deleteEvent', foundEvent);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Announcement not found');
    }
}

module.exports.updateEvent = async (req, res) => {
    if (req.body && req.body.description && req.body.title && req.body.date) {
        // Update the 'description' property
        const updatedData ={
            description: req.body.description,
            title: req.body.title,
            date: req.body.date

        }

        const result = await Events.updateOne({ _id: req.params.id }, { $set: updatedData });

        if (result.modifiedCount === 0){
            res.status(404).send("<h2 style='color:red'>Item Not Found</h2>")
            
        }

        // Send a response to the client indicating a successful update
        res.redirect('/home');
    } else {
        // Handle case when 'description' property is missing in req.body
        res.status(400).send('Bad Request: Missing description in request body');
    }
}



module.exports.update= async (req, res) => {
    if (req.body && req.body.username && req.body.email && req.body.password && req.body.address) {
        console.log(req.body)
        // Update the 'description' property
        const updatedData ={
            username: req.body.username,
            password: req.body.password,
            address: req.body.address

        }

        const result = await Users.updateOne({ email: req.body.email }, { $set: updatedData });

        if (result.modifiedCount === 0){
            res.status(404).send("<h2 style='color:red'>User Not Found</h2>")
            
        }

        // Send a response to the client indicating a successful update
        res.redirect('/setting');
    } else {
        // Handle case when 'description' property is missing in req.body
        res.status(400).send('Bad Request: Missing description in request body');
    }
}
module.exports.delete = async (req,res)=>{
    const result = await Events.deleteOne({ _id: req.params.id });
    res.redirect('/home')
}



