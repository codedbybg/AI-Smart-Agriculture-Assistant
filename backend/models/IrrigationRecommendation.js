const mongoose = require("mongoose");

const irrigationRecommendationSchema = new mongoose.Schema(
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

        soilRecord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SoilRecord",
            required: true,
        },

        inputs: {
            moisture: {
                type: Number,
                required: true,
            },

            temperature: {
                type: Number,
                required: true,
            },

            humidity: {
                type: Number,
                required: true,
            },
        },

        farmConditions: {
            currentCrop: {
                type: String,
                default: "",
            },

            irrigationSource: {
                type: String,
                default: "",
            },
        },

        moistureStatus: {
            type: String,
            required: true,
        },

        guidance: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "IrrigationRecommendation",
    irrigationRecommendationSchema
);