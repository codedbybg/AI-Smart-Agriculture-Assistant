import { useEffect, useState } from "react";

import {
    CloudRain,
    Droplets,
    Thermometer,
    Wind,
    Gauge,
    RefreshCw,
    AlertTriangle,
} from "lucide-react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    getWeatherHistory,
} from "../services/weatherService";


function WeatherHistory() {

    const [records, setRecords] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // LOAD HISTORY
    // ==========================================

    const loadHistory = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getWeatherHistory();

            setRecords(
                response.weatherRecords ||
                []
            );

        } catch (error) {

            console.error(
                "Weather history error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load weather history."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadHistory();

    }, []);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (
        date
    ) => {

        return new Date(
            date
        ).toLocaleString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    // ==========================================
    // CHART DATA
    // ==========================================

    const chartData =
        [...records]
            .reverse()
            .map((record) => ({

                date:
                    new Date(
                        record.recordedAt
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "short",
                        }
                    ),

                temperature:
                    record.temperature,

                humidity:
                    record.humidity,

                rainfall:
                    record.rainfall,

            }));


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50 px-4 py-8">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Weather History
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Review previously recorded
                            weather observations.
                        </p>

                    </div>


                    <button
                        onClick={loadHistory}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 font-medium text-white transition hover:bg-green-800 disabled:opacity-50"
                    >

                        <RefreshCw
                            size={18}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                        <AlertTriangle
                            size={20}
                        />

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* LOADING */}

                {loading && (

                    <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-gray-200 bg-white">

                        <div className="text-center">

                            <RefreshCw
                                size={32}
                                className="mx-auto mb-3 animate-spin text-green-700"
                            />

                            <p className="text-gray-600">
                                Loading weather history...
                            </p>

                        </div>

                    </div>

                )}


                {/* CONTENT */}

                {!loading &&
                    records.length > 0 && (

                        <>

                            {/* CHART */}

                            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                                    Temperature Trend
                                </h2>


                                <div className="h-[350px]">

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <LineChart
                                            data={
                                                chartData
                                            }
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                            />

                                            <XAxis
                                                dataKey="date"
                                            />

                                            <YAxis />

                                            <Tooltip />

                                            <Line
                                                type="monotone"
                                                dataKey="temperature"
                                                strokeWidth={3}
                                                name="Temperature °C"
                                                dot={{
                                                    r: 4,
                                                }}
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>

                                </div>

                            </div>


                            {/* HISTORY CARDS */}

                            <div className="space-y-5">

                                {records.map(
                                    (record) => (

                                        <div
                                            key={
                                                record._id
                                            }
                                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                        >

                                            {/* TOP */}

                                            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                                                <div>

                                                    <h3 className="text-lg font-semibold text-gray-900">

                                                        {
                                                            record.farm?.farmName ||
                                                            "Farm"
                                                        }

                                                    </h3>

                                                    <p className="text-sm text-gray-500">

                                                        {
                                                            record.farm?.location ||
                                                            record.location
                                                        }

                                                    </p>

                                                </div>


                                                <div className="text-sm text-gray-500">

                                                    {
                                                        formatDate(
                                                            record.recordedAt
                                                        )
                                                    }

                                                </div>

                                            </div>


                                            {/* DATA */}

                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

                                                <div className="rounded-xl bg-gray-50 p-4">

                                                    <Thermometer
                                                        size={20}
                                                        className="mb-2 text-orange-500"
                                                    />

                                                    <p className="text-sm text-gray-500">
                                                        Temperature
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-gray-900">

                                                        {
                                                            record.temperature
                                                        }
                                                        °C

                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-gray-50 p-4">

                                                    <Droplets
                                                        size={20}
                                                        className="mb-2 text-blue-500"
                                                    />

                                                    <p className="text-sm text-gray-500">
                                                        Humidity
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-gray-900">

                                                        {
                                                            record.humidity
                                                        }
                                                        %

                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-gray-50 p-4">

                                                    <CloudRain
                                                        size={20}
                                                        className="mb-2 text-blue-600"
                                                    />

                                                    <p className="text-sm text-gray-500">
                                                        Rainfall
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-gray-900">

                                                        {
                                                            record.rainfall
                                                        }
                                                        {" "}
                                                        mm

                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-gray-50 p-4">

                                                    <Wind
                                                        size={20}
                                                        className="mb-2 text-gray-500"
                                                    />

                                                    <p className="text-sm text-gray-500">
                                                        Wind
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-gray-900">

                                                        {
                                                            record.windSpeed
                                                        }
                                                        {" "}
                                                        m/s

                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-gray-50 p-4">

                                                    <Gauge
                                                        size={20}
                                                        className="mb-2 text-purple-500"
                                                    />

                                                    <p className="text-sm text-gray-500">
                                                        Pressure
                                                    </p>

                                                    <p className="mt-1 text-xl font-bold text-gray-900">

                                                        {
                                                            record.pressure
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* WEATHER CONDITION */}

                                            <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">

                                                {record.weatherIcon && (

                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${record.weatherIcon}@2x.png`}
                                                        alt="Weather"
                                                        className="h-12 w-12"
                                                    />

                                                )}

                                                <div>

                                                    <p className="font-medium capitalize text-gray-900">

                                                        {
                                                            record.weatherMain
                                                        }

                                                    </p>

                                                    <p className="text-sm capitalize text-gray-500">

                                                        {
                                                            record.weatherDescription
                                                        }

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* DISCLAIMER */}

                            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">

                                Weather records represent
                                observations retrieved from
                                the external weather service
                                at the recorded time. They should
                                be interpreted together with
                                local field conditions.

                            </div>

                        </>

                    )}


                {/* EMPTY */}

                {!loading &&
                    records.length === 0 &&
                    !error && (

                        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

                            <CloudRain
                                size={50}
                                className="mx-auto mb-4 text-gray-400"
                            />

                            <h2 className="text-xl font-semibold text-gray-900">
                                No weather history
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Fetch weather for one of
                                your farms to create the
                                first weather record.
                            </p>

                        </div>

                    )}

            </div>

        </div>
    );
}


export default WeatherHistory;