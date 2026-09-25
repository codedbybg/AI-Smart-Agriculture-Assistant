import { useEffect, useState } from "react";

import {
    CloudSun,
    Droplets,
    Wind,
    Thermometer,
    CloudRain,
    Gauge,
    MapPin,
    AlertCircle,
    CheckCircle,
    Loader2,
} from "lucide-react";

import { getFarms } from "../services/farmService";

import {
    getCurrentWeather,
} from "../services/weatherService";


function Weather() {

    const [farms, setFarms] =
        useState([]);

    const [selectedFarm, setSelectedFarm] =
        useState("");

    const [weather, setWeather] =
        useState(null);

    const [loadingFarms, setLoadingFarms] =
        useState(true);

    const [loadingWeather, setLoadingWeather] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // --------------------------------
    // Load farms
    // --------------------------------

    useEffect(() => {

        loadFarms();

    }, []);


    const loadFarms = async () => {

        try {

            setLoadingFarms(true);

            setError("");

            const response =
                await getFarms();


            console.log(
                "Weather - Farms response:",
                response
            );


            setFarms(
                response.farms || []
            );

        } catch (error) {

            console.error(
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


    // --------------------------------
    // Select farm
    // --------------------------------

    const handleFarmChange = async (
        event
    ) => {

        const farmId =
            event.target.value;


        setSelectedFarm(
            farmId
        );

        setWeather(null);

        setSuccess("");

        setError("");


        if (!farmId) {
            return;
        }


        try {

            setLoadingWeather(true);


            const response =
                await getCurrentWeather(
                    farmId
                );


            console.log(
                "Weather response:",
                response
            );


            if (!response.success) {

                throw new Error(
                    response.message ||
                    "Failed to fetch weather."
                );
            }


            setWeather(
                response.data
            );


            setSuccess(
                "Current weather loaded successfully."
            );

        } catch (error) {

            console.error(
                "Weather error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch weather."
            );

        } finally {

            setLoadingWeather(false);
        }
    };


    // --------------------------------
    // Weather icon URL
    // --------------------------------

    const getWeatherIconUrl = (
        icon
    ) => {

        if (!icon) {
            return null;
        }

        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    };


    // --------------------------------
    // Render
    // --------------------------------

    return (

        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">


                {/* Header */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">

                            <CloudSun size={26} />

                        </div>


                        <div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">

                                Weather

                            </h1>

                            <p className="mt-1 text-sm text-gray-600">

                                View current weather conditions
                                for your farm.

                            </p>

                        </div>

                    </div>

                </div>


                {/* Error */}

                {error && (

                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                        <AlertCircle
                            size={20}
                            className="mt-0.5 shrink-0"
                        />

                        <p className="text-sm">
                            {error}
                        </p>

                    </div>

                )}


                {/* Success */}

                {success && (

                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

                        <CheckCircle
                            size={20}
                            className="mt-0.5 shrink-0"
                        />

                        <p className="text-sm">
                            {success}
                        </p>

                    </div>

                )}


                {/* Farm Selection */}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <label
                        htmlFor="weatherFarm"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Select Farm
                    </label>


                    <select
                        id="weatherFarm"
                        value={selectedFarm}
                        onChange={
                            handleFarmChange
                        }
                        disabled={
                            loadingFarms ||
                            loadingWeather
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                    >

                        <option value="">

                            {loadingFarms
                                ? "Loading farms..."
                                : "Select a farm"}

                        </option>


                        {farms.map(
                            (farm) => (

                                <option
                                    key={farm._id}
                                    value={farm._id}
                                >

                                    {farm.farmName}
                                    {" — "}
                                    {farm.location}

                                </option>

                            )
                        )}

                    </select>


                    {!loadingFarms &&
                        farms.length === 0 && (

                            <p className="mt-2 text-sm text-red-600">

                                No farms found. Please create
                                a farm first.

                            </p>

                        )}

                </div>


                {/* Loading */}

                {loadingWeather && (

                    <div className="mt-8 flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-12">

                        <div className="text-center">

                            <Loader2
                                size={40}
                                className="mx-auto animate-spin text-sky-600"
                            />

                            <p className="mt-4 text-sm text-gray-600">

                                Fetching current weather...

                            </p>

                        </div>

                    </div>

                )}


                {/* Weather Result */}

                {weather && !loadingWeather && (

                    <div className="mt-8 space-y-6">


                        {/* Main Weather */}

                        <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-sm">

                            <div className="bg-sky-50 p-6">

                                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">


                                    <div>

                                        <div className="flex items-center gap-2 text-gray-600">

                                            <MapPin
                                                size={18}
                                            />

                                            <span className="font-medium">

                                                {
                                                    weather.farm
                                                        ?.name
                                                }

                                            </span>

                                        </div>


                                        <p className="mt-1 text-sm text-gray-500">

                                            {
                                                weather.farm
                                                    ?.location
                                            }

                                        </p>

                                    </div>


                                    <div className="flex items-center gap-4">

                                        {weather.weather
                                            ?.weatherIcon && (

                                            <img
                                                src={
                                                    getWeatherIconUrl(
                                                        weather
                                                            .weather
                                                            .weatherIcon
                                                    )
                                                }
                                                alt={
                                                    weather
                                                        .weather
                                                        .weatherDescription ||
                                                    "Weather"
                                                }
                                                className="h-20 w-20"
                                            />

                                        )}


                                        <div>

                                            <p className="text-4xl font-bold text-gray-900">

                                                {
                                                    weather
                                                        .weather
                                                        ?.temperature
                                                }°C

                                            </p>

                                            <p className="capitalize text-gray-600">

                                                {
                                                    weather
                                                        .weather
                                                        ?.weatherDescription
                                                }

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* Weather Cards */}

                            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">


                                {/* Feels Like */}

                                <div className="rounded-xl bg-gray-50 p-4">

                                    <div className="flex items-center gap-3">

                                        <Thermometer
                                            size={20}
                                            className="text-orange-600"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">

                                                Feels Like

                                            </p>

                                            <p className="text-lg font-semibold text-gray-900">

                                                {
                                                    weather
                                                        .weather
                                                        ?.feelsLike
                                                }°C

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Humidity */}

                                <div className="rounded-xl bg-gray-50 p-4">

                                    <div className="flex items-center gap-3">

                                        <Droplets
                                            size={20}
                                            className="text-blue-600"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">

                                                Humidity

                                            </p>

                                            <p className="text-lg font-semibold text-gray-900">

                                                {
                                                    weather
                                                        .weather
                                                        ?.humidity
                                                }%

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Wind */}

                                <div className="rounded-xl bg-gray-50 p-4">

                                    <div className="flex items-center gap-3">

                                        <Wind
                                            size={20}
                                            className="text-cyan-600"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">

                                                Wind Speed

                                            </p>

                                            <p className="text-lg font-semibold text-gray-900">

                                                {
                                                    weather
                                                        .weather
                                                        ?.windSpeed
                                                } m/s

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Pressure */}

                                <div className="rounded-xl bg-gray-50 p-4">

                                    <div className="flex items-center gap-3">

                                        <Gauge
                                            size={20}
                                            className="text-purple-600"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">

                                                Pressure

                                            </p>

                                            <p className="text-lg font-semibold text-gray-900">

                                                {
                                                    weather
                                                        .weather
                                                        ?.pressure
                                                } hPa

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Rainfall */}

                        <div className="grid gap-4 sm:grid-cols-2">


                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">

                                        <CloudRain
                                            size={25}
                                        />

                                    </div>


                                    <div>

                                        <p className="text-sm text-gray-500">

                                            Rainfall

                                        </p>

                                        <p className="text-2xl font-bold text-gray-900">

                                            {
                                                weather.weather
                                                    ?.rainfall || 0
                                            } mm

                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">

                                        <CloudSun
                                            size={25}
                                        />

                                    </div>


                                    <div>

                                        <p className="text-sm text-gray-500">

                                            Condition

                                        </p>

                                        <p className="text-2xl font-bold capitalize text-gray-900">

                                            {
                                                weather.weather
                                                    ?.weatherMain ||
                                                "Unknown"
                                            }

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Agriculture note */}

                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

                            <div className="flex items-start gap-3">

                                <AlertCircle
                                    size={20}
                                    className="mt-0.5 shrink-0 text-yellow-700"
                                />

                                <div>

                                    <h3 className="font-semibold text-yellow-900">

                                        Agriculture Weather Note

                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-yellow-800">

                                        Weather information is provided
                                        as environmental decision-support
                                        data. Irrigation, fertilizer,
                                        pesticide, and crop-management
                                        decisions should also consider
                                        soil conditions, crop stage,
                                        field observations, and local
                                        agricultural recommendations.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}


export default Weather;