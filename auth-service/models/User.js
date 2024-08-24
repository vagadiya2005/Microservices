const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true
        
    },
    email: {
        unique: true,
        type: String
        
    },
    password: {
        type: String
    }


});

module.exports = mongoose.model("users",userSchema);