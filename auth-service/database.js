const mongoose = require('mongoose');

const dburl = process.env.DB_URL;

mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Mongodb connected successfully'))
    .catch((err)=>console.error('Mongodb connection error:',err));

    module.exports = mongoose;