import api from "./api";


// ==========================================
// CURRENT WEATHER
// ==========================================

export const getCurrentWeather = async (
    farmId
) => {

    const response =
        await api.get(
            `/weather/current?farmId=${farmId}`
        );

    return response.data;
};


// ==========================================
// 5-DAY FORECAST
// ==========================================

export const getWeatherForecast =
    async (farmId) => {

        const response =
            await api.get(
                `/weather/forecast?farmId=${farmId}`
            );

        return response.data;
    };


// ==========================================
// WEATHER HISTORY
// ==========================================

export const getWeatherHistory =
    async () => {

        const response =
            await api.get(
                "/weather/history"
            );

        return response.data;
    };