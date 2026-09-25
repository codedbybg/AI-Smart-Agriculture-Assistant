const IrrigationRecommendation = require(
    "../models/IrrigationRecommendation"
);

const Farm = require("../models/Farm");

const SoilRecord = require(
    "../models/SoilRecord"
);

const {
    generateIrrigationGuidance,
} = require("../services/irrigationService");


const analyzeIrrigation = async (req, res) => {
    try {
        const {
            farmId,
            soilRecordId,
        } = req.body;


        if (!farmId || !soilRecordId) {
            return res.status(400).json({
                success: false,
                message:
                    "farmId and soilRecordId are required.",
            });
        }


        const farm = await Farm.findOne({
            _id: farmId,
            user: req.user._id,
        });


        if (!farm) {
            return res.status(404).json({
                success: false,
                message: "Farm not found.",
            });
        }


        const soilRecord = await SoilRecord.findOne({
            _id: soilRecordId,
            farm: farmId,
            user: req.user._id,
        });


        if (!soilRecord) {
            return res.status(404).json({
                success: false,
                message:
                    "Soil record not found for this farm.",
            });
        }


        const moisture = Number(
            soilRecord.moisture
        );

        const temperature = Number(
            soilRecord.temperature
        );

        const humidity = Number(
            soilRecord.humidity
        );


        if (
            Number.isNaN(moisture) ||
            Number.isNaN(temperature) ||
            Number.isNaN(humidity)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Soil record contains invalid irrigation data.",
            });
        }


        const result =
            generateIrrigationGuidance({
                moisture,
                temperature,
                humidity,
                currentCrop:
                    farm.currentCrop || "",
                irrigationSource:
                    farm.irrigationSource || "",
            });


        const recommendation =
            await IrrigationRecommendation.create({
                user: req.user._id,

                farm: farm._id,

                soilRecord: soilRecord._id,

                inputs: {
                    moisture,
                    temperature,
                    humidity,
                },

                farmConditions: {
                    currentCrop:
                        farm.currentCrop || "",

                    irrigationSource:
                        farm.irrigationSource || "",
                },

                moistureStatus:
                    result.moistureStatus,

                guidance:
                    result.guidance,
            });


        return res.status(201).json({
            success: true,

            message:
                "Irrigation guidance generated successfully.",

            data: {
                recommendationId:
                    recommendation._id,

                farm: {
                    id: farm._id,
                    name: farm.farmName,
                },

                soilRecord: {
                    id: soilRecord._id,
                },

                inputs: {
                    moisture,
                    temperature,
                    humidity,
                },

                farmConditions: {
                    currentCrop:
                        farm.currentCrop || "",

                    irrigationSource:
                        farm.irrigationSource || "",
                },

                moistureStatus:
                    result.moistureStatus,

                guidance:
                    result.guidance,

                createdAt:
                    recommendation.createdAt,
            },
        });

    } catch (error) {
        console.error(
            "Irrigation analysis error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to generate irrigation guidance.",
        });
    }
};


const getIrrigationHistory = async (
    req,
    res
) => {
    try {
        const recommendations =
            await IrrigationRecommendation.find({
                user: req.user._id,
            })
                .populate(
                    "farm",
                    "farmName location currentCrop irrigationSource"
                )
                .populate(
                    "soilRecord",
                    "moisture temperature humidity"
                )
                .sort({
                    createdAt: -1,
                });


        return res.status(200).json({
            success: true,

            count:
                recommendations.length,

            irrigationRecommendations:
                recommendations,
        });

    } catch (error) {
        console.error(
            "Get irrigation history error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch irrigation history.",
        });
    }
};


module.exports = {
    analyzeIrrigation,
    getIrrigationHistory,
};