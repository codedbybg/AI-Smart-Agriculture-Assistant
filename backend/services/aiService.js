const axios = require("axios");

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

const getCropPrediction = async (soilData) => {
    try {
        const response = await axios.post(
            `${AI_SERVICE_URL}/predict`,
            soilData,
            {
                timeout: 10000,
            }
        );

        return response.data;

    } catch (error) {
        console.error("========== AI SERVICE ERROR ==========");

        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("Status:", error.response?.status);
        console.error("Response:", error.response?.data);
        console.error("URL:", error.config?.url);

        console.error("======================================");

        throw new Error(
            "AI crop prediction service is currently unavailable"
        );
    }
};

module.exports = {
    getCropPrediction,
};