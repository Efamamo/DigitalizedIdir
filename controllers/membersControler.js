const Members = require('../models/users')


let arr =async function(){
    const members = await  Members.find({});
    const val=[members]
    return val
}



module.exports.getMembers = async (req, res) => {
    
  
    const val = await arr()
    let members = [];

    val[0].forEach(element => {
        if (element.role == "User") {
            members.push(element);
        }
    });

    if (members) {
        res.render('members', {members:members});

    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Members not found');
    }

   
  
}

module.exports.getSingleMember = async(req,res)=>{
    const val = await arr()
    let foundMember = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundMember = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundMember) {
        console.log(foundMember)
        res.render('singleMember', foundMember);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('News not found');
    }
}

module.exports.verifyMemberDelete = async(req,res)=>{
    const val = await arr()
    let foundMember = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundMember = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundMember) {
        res.render('deleteMember', foundMember);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Member not found');
    }
}

module.exports.deleteMembers = async (req,res)=>{
    const result = await Members.deleteOne({ _id: req.params.id });
    res.redirect('/members')
}