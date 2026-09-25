const axios = require("axios");

const WEATHER_API_KEY =
    process.env.WEATHER_API_KEY;

const CURRENT_WEATHER_API_URL =
    "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_API_URL =
    "https://api.openweathermap.org/data/2.5/forecast";


// ==========================================
// CURRENT WEATHER
// ==========================================

const getCurrentWeather = async (location) => {
    if (!WEATHER_API_KEY) {
        throw new Error(
            "Weather API key is not configured."
        );
    }

    if (!location) {
        throw new Error(
            "Location is required."
        );
    }

    try {
        const response =
            await axios.get(
                CURRENT_WEATHER_API_URL,
                {
                    params: {
                        q: location,
                        appid: WEATHER_API_KEY,
                        units: "metric",
                    },
                    timeout: 10000,
                }
            );

        const data =
            response.data;

        const rainfall =
            data.rain?.["1h"] ||
            data.rain?.["3h"] ||
            0;

        return {
            location: data.name,

            country:
                data.sys?.country || "",

            latitude:
                data.coord?.lat,

            longitude:
                data.coord?.lon,

            temperature:
                data.main?.temp,

            feelsLike:
                data.main?.feels_like,

            humidity:
                data.main?.humidity,

            pressure:
                data.main?.pressure,

            windSpeed:
                data.wind?.speed,

            weatherMain:
                data.weather?.[0]?.main || "",

            weatherDescription:
                data.weather?.[0]?.description || "",

            weatherIcon:
                data.weather?.[0]?.icon || "",

            rainfall,
        };

    } catch (error) {

        console.error(
            "Weather API error:",
            error.response?.data ||
            error.message
        );

        if (
            error.response?.status === 401
        ) {
            throw new Error(
                "Invalid weather API key."
            );
        }

        if (
            error.response?.status === 404
        ) {
            throw new Error(
                "Weather location not found."
            );
        }

        throw new Error(
            "Unable to fetch weather data."
        );
    }
};


// ==========================================
// 5-DAY FORECAST
// ==========================================

const getWeatherForecast = async (location) => {

    if (!WEATHER_API_KEY) {
        throw new Error(
            "Weather API key is not configured."
        );
    }

    if (!location) {
        throw new Error(
            "Location is required."
        );
    }

    try {

        const response =
            await axios.get(
                FORECAST_API_URL,
                {
                    params: {
                        q: location,
                        appid: WEATHER_API_KEY,
                        units: "metric",
                    },
                    timeout: 10000,
                }
            );

        const data =
            response.data;

        const forecastList =
            data.list || [];

        const dailyForecast = {};

        forecastList.forEach((item) => {

            const date =
                item.dt_txt.split(" ")[0];

            if (!dailyForecast[date]) {

                dailyForecast[date] = {
                    date,
                    temperatures: [],
                    humidity: [],
                    rainfall: 0,
                    weather: item.weather?.[0],
                    windSpeed: [],
                };
            }

            dailyForecast[
                date
            ].temperatures.push(
                item.main?.temp
            );

            dailyForecast[
                date
            ].humidity.push(
                item.main?.humidity
            );

            dailyForecast[
                date
            ].windSpeed.push(
                item.wind?.speed || 0
            );

            const rain =
                item.rain?.["3h"] || 0;

            dailyForecast[
                date
            ].rainfall += rain;
        });


        const forecast =
            Object.values(
                dailyForecast
            )
                .slice(0, 5)
                .map((day) => {

                    const temperatures =
                        day.temperatures;

                    const humidity =
                        day.humidity;

                    const windSpeed =
                        day.windSpeed;

                    return {
                        date: day.date,

                        minTemperature:
                            Number(
                                Math.min(
                                    ...temperatures
                                ).toFixed(1)
                            ),

                        maxTemperature:
                            Number(
                                Math.max(
                                    ...temperatures
                                ).toFixed(1)
                            ),

                        averageTemperature:
                            Number(
                                (
                                    temperatures.reduce(
                                        (sum, value) =>
                                            sum + value,
                                        0
                                    ) /
                                    temperatures.length
                                ).toFixed(1)
                            ),

                        averageHumidity:
                            Math.round(
                                humidity.reduce(
                                    (sum, value) =>
                                        sum + value,
                                    0
                                ) /
                                humidity.length
                            ),

                        rainfall:
                            Number(
                                day.rainfall.toFixed(
                                    1
                                )
                            ),

                        averageWindSpeed:
                            Number(
                                (
                                    windSpeed.reduce(
                                        (sum, value) =>
                                            sum + value,
                                        0
                                    ) /
                                    windSpeed.length
                                ).toFixed(1)
                            ),

                        weatherMain:
                            day.weather?.main ||
                            "",

                        weatherDescription:
                            day.weather?.description ||
                            "",

                        weatherIcon:
                            day.weather?.icon ||
                            "",
                    };
                });


        return {
            location:
                data.city?.name || location,

            country:
                data.city?.country || "",

            latitude:
                data.city?.coord?.lat,

            longitude:
                data.city?.coord?.lon,

            forecast,
        };

    } catch (error) {

        console.error(
            "Weather forecast API error:",
            error.response?.data ||
            error.message
        );

        if (
            error.response?.status === 401
        ) {
            throw new Error(
                "Invalid weather API key."
            );
        }

        if (
            error.response?.status === 404
        ) {
            throw new Error(
                "Weather location not found."
            );
        }

        throw new Error(
            "Unable to fetch weather forecast."
        );
    }
};


module.exports = {
    getCurrentWeather,
    getWeatherForecast,
};