const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    name: {
        type: String, 
    },
    email: {
        type: String,
        unique: true
    },
    age:{
        type:Number     
    },
    gender:{
        type:String
        }


});

module.exports = mongoose.model('profiles',profileSchema);
