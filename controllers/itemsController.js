const Items = require('../models/items')
const Users = require("../models/users")

let arr =async function(){
    const items = await  Items.find({});
    const val=[items]
    return val
}

let members = async function(){
    const users = await  Users.find({});
    const val=[users]
    return val
}

module.exports.getItems = async (req, res) => {
    const val = await arr()
    res.render('member-items',{ items: val[0]})
    
}

module.exports.getAddItems = (req,res)=>{
    res.render('item')
}

module.exports.verifyDelete = async(req,res)=>{
    const val = await arr()
    let foundItem = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundItem = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundItem) {
        res.render('deleteItem', foundItem);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Announcement not found');
    }
}

module.exports.contactAdmin = async(req,res)=>{
    const val = await members()
    let admins = [];

    val[0].forEach(element => {
        if (element.role == "Admin") {
            admins.push(element);
        }
    });

    if (admins) {
        res.render('admins', {admins:admins});
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}

module.exports.getSingleItem = async(req,res)=>{
    const val = await arr()
    let foundAnnouncement = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundAnnouncement = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundAnnouncement) {
        res.render('singleItem', foundAnnouncement);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}

module.exports.deleteItem = async (req,res)=>{
    const result = await Items.deleteOne({ _id: req.params.id });
    res.redirect('/items')
}

module.exports.updateItem = async (req, res) => {
    if (req.body && req.body.image && req.body.name && req.body.amount && req.body.price) {
        // Update the 'description' property
        const updatedData ={
            imageUrl: req.body.image,
            price: req.body.price,
            amount: req.body.amount,
            name: req.body.name

        }

        const result = await Items.updateOne({ _id: req.params.id }, { $set: updatedData });

        if (result.modifiedCount === 0){
            res.status(404).send("<h2 style='color:red'>Item Not Found</h2>")
            
        }

        // Send a response to the client indicating a successful update
        res.redirect('/items');
    } else {
        // Handle case when 'description' property is missing in req.body
        res.status(400).send('Bad Request: Missing description in request body');
    }
}


module.exports.addItem = async (req,res)=>{
    console.log(req.body)
    try{
        const news = await Items.create({
                                        imageUrl:req.body.image,
                                        name:req.body.name,
                                        amount: req.body.amount,
                                        price: req.body.price
                                        })
        res.redirect('/items')
    
        }

    catch(err){
        console.log(err)
    }
    
}