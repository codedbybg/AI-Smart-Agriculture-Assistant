import api from "./api";


export const analyzeIrrigation = async (data) => {
    const response = await api.post(
        "/irrigation/analyze",
        data
    );

    return response.data;
};


export const getIrrigationHistory = async () => {
    const response = await api.get(
        "/irrigation/history"
    );

    return response.data;
};