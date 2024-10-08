const express = require('express');
const cors = require('cors');
const app = express();
const client = require('prom-client'); // Prometheus client
require('dotenv').config();
app.use(express.json());

// DB connection 

require('./database');
const port = process.env.PORT || 3000;


const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Create a counter for the number of requests
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'endpoint'],
});
register.registerMetric(requestCounter);

// Middleware to count the requests
app.use((req, res, next) => {
  requestCounter.inc({ method: req.method, endpoint: req.path });
  next();
});

// Endpoint to expose metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// middleware
   
const corsOptions = require('./middleware/corsMiddleware');
app.use(cors(corsOptions));


const profileRoutes = require('./routes/profileRoutes');
app.use(profileRoutes);


// server starting...
app.listen(port,()=>{

    console.log(`app running on ${port} port`);
    

})
