const WeatherRecord = require(
    "../models/WeatherRecord"
);

const Farm = require(
    "../models/Farm"
);

const {
    getCurrentWeather,
    getWeatherForecast,
} = require(
    "../services/weatherService"
);


// ==========================================
// CURRENT WEATHER
// ==========================================

const getFarmWeather = async (
    req,
    res
) => {

    try {

        const { farmId } =
            req.query;

        if (!farmId) {

            return res.status(400).json({
                success: false,
                message:
                    "farmId is required.",
            });
        }


        const farm =
            await Farm.findOne({
                _id: farmId,
                user: req.user._id,
            });


        if (!farm) {

            return res.status(404).json({
                success: false,
                message:
                    "Farm not found.",
            });
        }


        const weather =
            await getCurrentWeather(
                farm.location
            );


        const weatherRecord =
            await WeatherRecord.create({

                user:
                    req.user._id,

                farm:
                    farm._id,

                location:
                    farm.location,

                latitude:
                    weather.latitude,

                longitude:
                    weather.longitude,

                temperature:
                    weather.temperature,

                feelsLike:
                    weather.feelsLike,

                humidity:
                    weather.humidity,

                pressure:
                    weather.pressure,

                windSpeed:
                    weather.windSpeed,

                weatherMain:
                    weather.weatherMain,

                weatherDescription:
                    weather.weatherDescription,

                weatherIcon:
                    weather.weatherIcon,

                rainfall:
                    weather.rainfall,

                recordedAt:
                    new Date(),
            });


        return res.status(200).json({

            success: true,

            message:
                "Weather fetched successfully.",

            data: {

                weatherId:
                    weatherRecord._id,

                farm: {
                    id:
                        farm._id,

                    name:
                        farm.farmName,

                    location:
                        farm.location,
                },

                weather,
            },
        });

    } catch (error) {

        console.error(
            "Get farm weather error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch weather.",
        });
    }
};


// ==========================================
// WEATHER FORECAST
// ==========================================

const getFarmWeatherForecast =
    async (req, res) => {

        try {

            const { farmId } =
                req.query;


            if (!farmId) {

                return res.status(400).json({
                    success: false,
                    message:
                        "farmId is required.",
                });
            }


            const farm =
                await Farm.findOne({
                    _id: farmId,
                    user: req.user._id,
                });


            if (!farm) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Farm not found.",
                });
            }


            const forecast =
                await getWeatherForecast(
                    farm.location
                );


            return res.status(200).json({

                success: true,

                message:
                    "Weather forecast fetched successfully.",

                data: {

                    farm: {
                        id:
                            farm._id,

                        name:
                            farm.farmName,

                        location:
                            farm.location,
                    },

                    forecast,
                },
            });

        } catch (error) {

            console.error(
                "Get weather forecast error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to fetch weather forecast.",
            });
        }
    };


// ==========================================
// WEATHER HISTORY
// ==========================================

const getWeatherHistory =
    async (req, res) => {

        try {

            const records =
                await WeatherRecord.find({
                    user:
                        req.user._id,
                })
                    .populate(
                        "farm",
                        "farmName location currentCrop"
                    )
                    .sort({
                        recordedAt: -1,
                    });


            return res.status(200).json({

                success: true,

                count:
                    records.length,

                weatherRecords:
                    records,
            });

        } catch (error) {

            console.error(
                "Get weather history error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch weather history.",
            });
        }
    };


module.exports = {

    getFarmWeather,

    getFarmWeatherForecast,

    getWeatherHistory,
};