const Prediction = require("../models/Prediction");
const Farm = require("../models/Farm");
const SoilRecord = require("../models/SoilRecord");

const { getCropPrediction } = require("../services/aiService");


// =====================================================
// Generate Crop Prediction
// =====================================================

const predictCrop = async (req, res) => {
    try {
        const {
            farmId,
            soilRecordId,
            rainfall,
        } = req.body;


        // -------------------------------------------------
        // 1. Validate required fields
        // -------------------------------------------------

        if (!farmId || !soilRecordId || rainfall === undefined) {
            return res.status(400).json({
                success: false,
                message: "farmId, soilRecordId and rainfall are required.",
            });
        }


        // -------------------------------------------------
        // 2. Find farm belonging to logged-in user
        // -------------------------------------------------

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


        // -------------------------------------------------
        // 3. Find soil record belonging to logged-in user
        // -------------------------------------------------

        const soilRecord = await SoilRecord.findOne({
            _id: soilRecordId,
            user: req.user._id,
            farm: farmId,
        });

        if (!soilRecord) {
            return res.status(404).json({
                success: false,
                message: "Soil record not found for this farm.",
            });
        }


        // -------------------------------------------------
        // 4. Validate rainfall
        // -------------------------------------------------

        const rainfallValue = Number(rainfall);

        if (Number.isNaN(rainfallValue) || rainfallValue < 0) {
            return res.status(400).json({
                success: false,
                message: "Rainfall must be a valid non-negative number.",
            });
        }


        // -------------------------------------------------
        // 5. Prepare AI input from Soil Record
        // -------------------------------------------------

        const soilData = {
            N: Number(soilRecord.nitrogen),
            P: Number(soilRecord.phosphorus),
            K: Number(soilRecord.potassium),

            temperature: Number(soilRecord.temperature),
            humidity: Number(soilRecord.humidity),
            ph: Number(soilRecord.ph),

            rainfall: rainfallValue,
        };


        // -------------------------------------------------
        // 6. Send data to FastAPI AI service
        // -------------------------------------------------

        const predictionResult = await getCropPrediction(soilData);


        // -------------------------------------------------
        // 7. Extract prediction information
        // -------------------------------------------------

        const predictedCrop = predictionResult.prediction;

        const confidence = Number(
            predictionResult.confidence || 0
        );

        const topPredictions =
            predictionResult.top_predictions || [];


        if (!predictedCrop) {
            return res.status(500).json({
                success: false,
                message: "AI service did not return a crop prediction.",
            });
        }


        // -------------------------------------------------
        // 8. Save prediction history
        // -------------------------------------------------

        const prediction = await Prediction.create({
            user: req.user._id,

            farm: farm._id,

            soilRecord: soilRecord._id,

            inputs: soilData,

            predictedCrop,

            confidence,

            topPredictions,
        });


        // -------------------------------------------------
        // 9. Return result
        // -------------------------------------------------

        return res.status(201).json({
            success: true,

            message: "Crop prediction generated and saved successfully.",

            data: {
                predictionId: prediction._id,

                farm: {
                    id: farm._id,
                    name: farm.farmName,
                },

                soilRecord: {
                    id: soilRecord._id,
                },

                inputs: soilData,

                predictedCrop,

                confidence,

                topPredictions,

                createdAt: prediction.createdAt,
            },
        });

    } catch (error) {

        console.error(
            "Crop prediction controller error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to generate crop prediction.",
        });
    }
};


// =====================================================
// Get Prediction History
// =====================================================

const getPredictionHistory = async (req, res) => {
    try {

        const predictions = await Prediction.find({
            user: req.user._id,
        })
            .populate("farm", "farmName location")
            .populate(
                "soilRecord",
                "nitrogen phosphorus potassium ph moisture temperature humidity"
            )
            .sort({ createdAt: -1 });


        return res.status(200).json({
            success: true,
            count: predictions.length,
            data: predictions,
        });

    } catch (error) {

        console.error(
            "Get prediction history error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch prediction history.",
        });
    }
};


module.exports = {
    predictCrop,
    getPredictionHistory,
};