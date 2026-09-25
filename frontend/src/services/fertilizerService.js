import api from "./api";

export const analyzeFertilizer = async (data)=>{
    const response = await api.post("/fertilizer/analyze" , data);
    
    return response.data;
};

export const getFertilizerHistory = async ()=>{
    const response = await api.get("/fertilizer/history");

    return response.data;
};