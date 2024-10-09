const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(express.json());

// DB connection 

require('./database');
const port = process.env.PORT || 3000;

// middleware
   
const corsOptions = require('./middleware/corsMiddleware');
app.use(cors(corsOptions));


const profileRoutes = require('./routes/profileRoutes');
app.use(profileRoutes);


// server starting...
app.listen(port,()=>{

    console.log(`app running on ${port} port`);
    

})
