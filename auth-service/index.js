const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(express.json());

// DB connections

require('./database');
const port = 3000;

// middleware

const corsOptions = require('./middleware/corsMiddleware');
app.use(cors(corsOptions));


const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);


// server starting...
app.listen(port,()=>{

    console.log(`app running on port number ${port}`);
    

})
