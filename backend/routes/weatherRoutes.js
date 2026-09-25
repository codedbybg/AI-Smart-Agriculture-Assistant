const express = require("express");

const {
    getFarmWeather,
    getFarmWeatherForecast,
    getWeatherHistory,
} = require(
    "../controllers/weatherController"
);

const {
    protect,
} = require(
    "../middlewares/authMiddleware"
);

const router = express.Router();


// All weather routes require login
router.use(protect);


// Current weather
router.get(
    "/current",
    getFarmWeather
);


// 5-day forecast
router.get(
    "/forecast",
    getFarmWeatherForecast
);


// Weather history
router.get(
    "/history",
    getWeatherHistory
);


module.exports = router;