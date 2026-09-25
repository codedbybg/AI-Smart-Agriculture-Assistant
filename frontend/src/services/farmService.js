import api from "./api";

// Get all farms
export const getFarms = async ()=>{
    const response = await api.get("/farms");

    return response.data;
};

// Get one farm
export const getFarmById = async (id)=>{
    const response = await api.get(`/farms/${id}`);

    return response.data;
};

// Create Farm
export const createFarm = async (farmData)=>{
    const response = await api.post("/farms" , farmData);


    return response.data;
};

// Update farm
export const updateFarm = async (id , farmData)=>{
    const response = await api.put(`/farms/${id}` , farmData);

    return response.data;
};

export const deleteFarm = async (id)=>{
    const response = await api.delete(`/farms/${id}`);

    return response.data;
};