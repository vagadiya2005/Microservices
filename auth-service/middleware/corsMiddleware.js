const corsOptions = {
    origin: "*", // Adjust this in production to your actual domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

module.exports = corsOptions;
