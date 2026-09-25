import { useEffect, useState } from "react";

import {
    CloudRain,
    Droplets,
    Thermometer,
    Wind,
    MapPin,
    RefreshCw,
    AlertTriangle,
} from "lucide-react";

import { getFarms } from "../services/farmService";

import {
    getWeatherForecast,
} from "../services/weatherService";


function WeatherForecast() {

    const [farms, setFarms] =
        useState([]);

    const [selectedFarmId, setSelectedFarmId] =
        useState("");

    const [forecast, setForecast] =
        useState(null);

    const [loadingFarms, setLoadingFarms] =
        useState(true);

    const [loadingForecast, setLoadingForecast] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // LOAD FARMS
    // ==========================================

    useEffect(() => {

        const loadFarms = async () => {

            try {

                setLoadingFarms(true);

                const response =
                    await getFarms();

                setFarms(
                    response.farms ||
                    response.data ||
                    []
                );

            } catch (error) {

                console.error(
                    "Load farms error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load farms."
                );

            } finally {

                setLoadingFarms(false);
            }
        };


        loadFarms();

    }, []);


    // ==========================================
    // LOAD FORECAST
    // ==========================================

    const loadForecast = async (
        farmId
    ) => {

        if (!farmId) {
            setForecast(null);
            return;
        }


        try {

            setLoadingForecast(true);

            setError("");

            const response =
                await getWeatherForecast(
                    farmId
                );


            setForecast(
                response.data?.forecast ||
                null
            );

        } catch (error) {

            console.error(
                "Forecast error:",
                error
            );

            setForecast(null);

            setError(
                error.response?.data?.message ||
                "Failed to fetch weather forecast."
            );

        } finally {

            setLoadingForecast(false);
        }
    };


    // ==========================================
    // FARM CHANGE
    // ==========================================

    const handleFarmChange = (
        event
    ) => {

        const farmId =
            event.target.value;

        setSelectedFarmId(
            farmId
        );

        setForecast(null);

        setError("");

        loadForecast(farmId);
    };


    // ==========================================
    // WEATHER ICON
    // ==========================================

    const getWeatherIcon = (
        icon
    ) => {

        if (!icon) {
            return null;
        }

        return (
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Weather"
                className="h-16 w-16"
            />
        );
    };


    // ==========================================
    // DATE FORMAT
    // ==========================================

    const formatDate = (
        date
    ) => {

        return new Date(
            `${date}T12:00:00`
        ).toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "numeric",
                month: "short",
            }
        );
    };


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        5-Day Weather Forecast
                    </h1>

                    <p className="mt-2 text-gray-600">
                        View upcoming weather conditions
                        for your selected farm.
                    </p>

                </div>


                {/* FARM SELECTOR */}

                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <label className="mb-2 block text-sm font-medium text-gray-700">

                        Select Farm

                    </label>


                    <select
                        value={selectedFarmId}
                        onChange={handleFarmChange}
                        disabled={loadingFarms}
                        className="w-full max-w-xl rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >

                        <option value="">
                            {loadingFarms
                                ? "Loading farms..."
                                : "Select a farm"}
                        </option>


                        {farms.map(
                            (farm) => (

                                <option
                                    key={
                                        farm._id
                                    }
                                    value={
                                        farm._id
                                    }
                                >
                                    {farm.farmName}
                                    {" — "}
                                    {farm.location}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                        <AlertTriangle
                            size={20}
                            className="mt-0.5 shrink-0"
                        />

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* LOADING */}

                {loadingForecast && (

                    <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-gray-200 bg-white">

                        <div className="text-center">

                            <RefreshCw
                                className="mx-auto mb-3 animate-spin text-green-700"
                                size={32}
                            />

                            <p className="text-gray-600">
                                Fetching weather forecast...
                            </p>

                        </div>

                    </div>

                )}


                {/* FORECAST */}

                {!loadingForecast &&
                    forecast &&
                    forecast.forecast?.length > 0 && (

                        <div>

                            {/* LOCATION */}

                            <div className="mb-6 flex items-center gap-2 text-gray-700">

                                <MapPin
                                    size={20}
                                    className="text-green-700"
                                />

                                <span className="font-medium">
                                    {forecast.location}
                                    {forecast.country
                                        ? `, ${forecast.country}`
                                        : ""}
                                </span>

                            </div>


                            {/* FORECAST CARDS */}

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

                                {forecast.forecast.map(
                                    (day) => (

                                        <div
                                            key={
                                                day.date
                                            }
                                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >

                                            <p className="font-semibold text-gray-900">
                                                {formatDate(
                                                    day.date
                                                )}
                                            </p>


                                            <div className="mt-3 flex items-center justify-between">

                                                <div>
                                                    {getWeatherIcon(
                                                        day.weatherIcon
                                                    )}
                                                </div>

                                                <div className="text-right">

                                                    <p className="text-2xl font-bold text-gray-900">

                                                        {Math.round(
                                                            day.averageTemperature
                                                        )}
                                                        °C

                                                    </p>

                                                    <p className="text-xs capitalize text-gray-500">

                                                        {
                                                            day.weatherDescription
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* TEMP */}

                                            <div className="mt-5 flex items-center gap-2">

                                                <Thermometer
                                                    size={18}
                                                    className="text-orange-500"
                                                />

                                                <span className="text-sm text-gray-700">

                                                    {day.minTemperature}
                                                    °C —

                                                    {" "}

                                                    {day.maxTemperature}
                                                    °C

                                                </span>

                                            </div>


                                            {/* HUMIDITY */}

                                            <div className="mt-3 flex items-center gap-2">

                                                <Droplets
                                                    size={18}
                                                    className="text-blue-500"
                                                />

                                                <span className="text-sm text-gray-700">

                                                    Humidity:

                                                    {" "}

                                                    {day.averageHumidity}
                                                    %

                                                </span>

                                            </div>


                                            {/* RAIN */}

                                            <div className="mt-3 flex items-center gap-2">

                                                <CloudRain
                                                    size={18}
                                                    className="text-blue-600"
                                                />

                                                <span className="text-sm text-gray-700">

                                                    Rain:

                                                    {" "}

                                                    {day.rainfall}
                                                    {" "}
                                                    mm

                                                </span>

                                            </div>


                                            {/* WIND */}

                                            <div className="mt-3 flex items-center gap-2">

                                                <Wind
                                                    size={18}
                                                    className="text-gray-500"
                                                />

                                                <span className="text-sm text-gray-700">

                                                    Wind:

                                                    {" "}

                                                    {day.averageWindSpeed}
                                                    {" "}
                                                    m/s

                                                </span>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* DISCLAIMER */}

                            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">

                                <strong>
                                    Important:
                                </strong>{" "}

                                Weather forecasts can change
                                over time. Use this information
                                as decision-support and consider
                                local field conditions before
                                making agricultural decisions.

                            </div>

                        </div>

                    )}


                {/* EMPTY */}

                {!loadingForecast &&
                    selectedFarmId &&
                    !forecast &&
                    !error && (

                        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

                            <CloudRain
                                className="mx-auto mb-4 text-gray-400"
                                size={45}
                            />

                            <p className="text-gray-600">
                                No forecast available.
                            </p>

                        </div>

                    )}

            </div>

        </div>
    );
}


export default WeatherForecast;