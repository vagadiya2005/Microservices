const mongoose = require('mongoose');
const Database = 'microservices';

const dburl = `mongodb+srv://23ce140:cxFGrQJU8OeTCXVG@cluster0.paezpii.mongodb.net/microservices`;

mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Mongodb connected successfully'))
    .catch((err)=>console.error('Mongodb connection error:',err));

    module.exports = mongoose;