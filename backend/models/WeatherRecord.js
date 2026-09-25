const mongoose = require("mongoose");

const weatherRecordSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        farm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farm",
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        latitude: {
            type: Number,
        },

        longitude: {
            type: Number,
        },

        temperature: {
            type: Number,
            required: true,
        },

        feelsLike: {
            type: Number,
        },

        humidity: {
            type: Number,
        },

        pressure: {
            type: Number,
        },

        windSpeed: {
            type: Number,
        },

        weatherMain: {
            type: String,
        },

        weatherDescription: {
            type: String,
        },

        weatherIcon: {
            type: String,
        },

        rainfall: {
            type: Number,
            default: 0,
        },

        recordedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "WeatherRecord",
    weatherRecordSchema
);