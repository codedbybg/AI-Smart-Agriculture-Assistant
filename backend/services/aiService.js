const axios = require("axios");

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

const getCropPrediction = async (soilData) => {
    try {
        console.log("========== AI SERVICE REQUEST ==========");
        console.log("AI Service URL:", AI_SERVICE_URL);
        console.log("Sending data:", soilData);

        const response = await axios.post(
            `${AI_SERVICE_URL}/predict`,
            soilData,
            {
                timeout: 30000,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("========== AI SERVICE RESPONSE ==========");
        console.log("Status:", response.status);
        console.log("Response data:", response.data);
        console.log("=========================================");

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