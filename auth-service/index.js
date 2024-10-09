const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

// DB connection 

require('./database');
const port = 80;

// middleware

const corsOptions = require('./middleware/corsMiddleware');
app.use(cors(corsOptions));


const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);


// server starting...
app.listen(port,()=>{

    console.log(`app running on port number ${port}`);
    

})