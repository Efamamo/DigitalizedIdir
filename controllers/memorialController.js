const Memorial = require('../models/memorials')

let arr =async function(){
    const memorials = await  Memorial.find({});
    const val=[memorials]
    return val
}

module.exports.getMemorials = async (req, res) => {
    try {
        val = await arr()
        res.render('memoriallist',{memorials:val[0]})
    } catch (error) {
        console.error('Error fetching memorials:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getSingleMemorial = async (req, res) => {
    const val = await arr()
    let foundMemorial = null;
    

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundMemorial = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundMemorial) {
        res.render('singleMemorial', foundMemorial);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Memorial not found');
    }
}

module.exports.verifyMemorialDelete = async(req,res)=>{
    const val = await arr()
    let foundMemorial = null;

    val[0].forEach(element => {
        if (element.id == req.params.id) {
            foundMemorial = element;
            return; // Exit the loop once a match is found
        }
    });

    if (foundMemorial) {
        res.render('deleteMemorial', foundMemorial);
    } else {
        // Handle case when news with the specified ID is not found
        res.status(404).send('Announcement not found');
    }
}

module.exports.getAddMemorial = (req,res)=>{
    res.render('addMemorial')
}

module.exports.addMemorial = async (req, res) => {
    try{
        const news = await Memorial.create({
            name:req.body.name,
            birthdate:req.body.Bdate,
            deceasedDate:req.body.Ddate,
            obituary:req.body.orbituary,
            picture: req.body.image
                                        })
        res.redirect('/memorials')
    
        }

    catch(err){
        console.log(err)
    }
    
}

module.exports.updateMemorial = async (req, res) => {
    console.log(req.body)
    if (req.body && req.body.name && req.body.Bdate && req.body.Ddate && req.body.obituary) {
        
        // Update the 'description' property
        const updatedData ={
            name: req.body.name,
            birthdate: req.body.Bdate,
            deceasedDate: req.body.Ddate,
            picture: req.body.picture,
            obituary:req.body.obituary

        }

        const result = await Memorial.updateOne({ _id: req.params.id }, { $set: updatedData });

        if (result.modifiedCount === 0){
            res.status(404).send("<h2 style='color:red'>Item Not Found</h2>")
            
        }

       
        res.redirect('/memorials');
    } else {
        res.status(400).send('Bad Request: Missing description in request body');
    }
}

module.exports.deleteMemorial = async (req,res)=>{
    const result = await Memorial.deleteOne({ _id: req.params.id });
    res.redirect('/memorials')
}