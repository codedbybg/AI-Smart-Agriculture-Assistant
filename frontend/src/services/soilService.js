import api  from "./api";

// Create soil analysis
export const createSoilRecord = async(soilData)=>{
    const response = await api.post("/soil" , soilData);

    return response.data;
};

// Get all soil records
export const getSoilRecords = async ()=>{
    const response = await api.get("/soil");

    return response.data;
};

// Get soil record for a farm
export const getSoilRecordsByFarm = async(farmId)=>{
    const response = await api.get(`/soil/farm/${farmId}`);

    return response.data;
};

// Get single soil record
export const getSoilRecordById = async(id)=>{
    const response = await api.get(`/soil/${id}`);

    return response.data;
};