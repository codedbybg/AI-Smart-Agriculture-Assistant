import api from "./api";

// Generate crop prediction
export const predictCrop = async (data)=>{
    const response = await api.post("/crop/predict" , data);

    return response.data;
};

// Get crop prediction history
export const getCropPredictionHistory = async ()=>{
    const response = await api.get("/crop/history");

    return response.data;
};
