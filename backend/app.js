const express =  require('express');
/* CORS allows the frontend to communicate with our backend. */
const cors = require('cors');   
// helps us see requests in the terminal.
const morgan = require('morgan');

const testRoutes = require('./routes/testRoutes')
const authRoutes = require("./routes/authRoutes")
const farmRoutes = require("./routes/farmRoutes")
const soilRoutes = require("./routes/soilRoutes")
const cropRoutes = require("./routes/cropRoutes");
const fertilizerRoutes = require("./routes/fertilizerRoutes");
const irrigationRoutes = require("./routes/irrigationRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const { notFound , errorHandler } = require('./middlewares/errorMiddleware')
const app = express();

// ------------------------------
// Global Middleware
// ------------------------------
app.use(cors());
app.use(express.json()); /* Convert incoming JSON request bodies into JavaScript objects. */
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

// ------------------------------
// Health Check
// ------------------------------
app.get("/" , (req , res)=>{
    res.json({
        success : true,
        message : "AI Smart Agriculture Assistant API is running",
    });
});

app.use("/api/v1/test" , testRoutes);
app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/farms" , farmRoutes);
app.use("/api/v1/soil" , soilRoutes);
app.use("/api/v1/crop", cropRoutes);
app.use("/api/v1/fertilizer" , fertilizerRoutes);
app.use("/api/v1/irrigation" , irrigationRoutes);
app.use("/api/v1/weather" , weatherRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;