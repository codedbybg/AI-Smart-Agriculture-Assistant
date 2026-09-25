const axios = require("axios");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

const getCropPrediction = async (soilData)=>{
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/predict` , soilData , { timeout: 10000 , });

        return response.data;

    } catch (error) {
        console.error("AI Service Error: " , error.response?.data || error.message);

        throw new Error("AI crop prediction service is currently unavailable");
    }
};

module.exports = {
    getCropPrediction ,
}