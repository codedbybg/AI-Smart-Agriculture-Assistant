const FertilizerRecommendation = require(
    "../models/FertilizerRecommendation"
);

const Farm = require("../models/Farm");

const SoilRecord = require(
    "../models/SoilRecord"
);

const {
    generateFertilizerGuidance,
} = require("../services/fertilizerService");


const analyzeFertilizer = async (req, res) => {
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


        const inputs = {
            nitrogen: Number(
                soilRecord.nitrogen
            ),

            phosphorus: Number(
                soilRecord.phosphorus
            ),

            potassium: Number(
                soilRecord.potassium
            ),

            ph: Number(
                soilRecord.ph
            ),
        };


        const result = generateFertilizerGuidance(
            inputs
        );


        const recommendation =
            await FertilizerRecommendation.create({
                user: req.user._id,

                farm: farm._id,

                soilRecord: soilRecord._id,

                inputs,

                nutrientStatus:
                    result.nutrientStatus,

                guidance:
                    result.guidance,
            });


        return res.status(201).json({
            success: true,

            message:
                "Fertilizer guidance generated successfully.",

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

                inputs,

                nutrientStatus:
                    result.nutrientStatus,

                guidance:
                    result.guidance,

                createdAt:
                    recommendation.createdAt,
            },
        });

    } catch (error) {

        console.error(
            "Fertilizer analysis error:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Failed to generate fertilizer guidance.",
        });
    }
};


const getFertilizerHistory = async (
    req,
    res
) => {
    try {

        const recommendations =
            await FertilizerRecommendation.find({
                user: req.user._id,
            })
                .populate(
                    "farm",
                    "farmName location"
                )
                .populate(
                    "soilRecord",
                    "nitrogen phosphorus potassium ph"
                )
                .sort({
                    createdAt: -1,
                });


        return res.status(200).json({
            success: true,

            count:
                recommendations.length,

            fertilizerRecommendations:
                recommendations,
        });

    } catch (error) {

        console.error(
            "Get fertilizer history error:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                "Failed to fetch fertilizer history.",
        });
    }
};


module.exports = {
    analyzeFertilizer,
    getFertilizerHistory,
};