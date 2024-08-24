const Profile = require('../models/profile');


exports.add = async(req,res)=>{

    try{

        let newProfile = new Profile(req.body);
        let result = await newProfile.save();
        console.log(result);
        res.status(201).send(result);

    }catch(error){

        if (error.code === 11000) {
            // This is a duplicate key error
            const field = Object.keys(error.keyValue)[0];
            res.status(400).send(`${field} must be unique`);
        }
        
        else
        res.status(500).send({ message: "Failed to add profile", error: error.message });
    }

};

exports.all = async(req,res)=>{

    try{

        let result = await Profile.find();

        if(result.length < 1){
            res.status(404).send({ message: "Profiles not available!" });
        }

        else{

            console.log(result);
            res.status(200).send(result);
        }

    }catch(error){
        res.status(500).send({ message: "Failed to fetch profiles!", error: error.message });
    }

};

exports.search = async(req,res)=>{

    try{

        let result = await Profile.findOne({email: req.body.email});

        if(result){
            console.log(result);
            res.status(200).send(result);
        }else{
            res.status(404).send({ message: "Profile not found!" });
        }

    }catch(error){
        res.status(500).send({ message: "Failed to search profile!", error: error.message });
    }



};