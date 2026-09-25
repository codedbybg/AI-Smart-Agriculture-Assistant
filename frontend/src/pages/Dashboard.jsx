import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    LayoutDashboard,
    Sprout,
    FlaskConical,
    BrainCircuit,
    Droplets,
    CloudSun,
    CalendarDays,
    History,
    Map,
    ArrowRight,
    MapPin,
    Activity,
    Leaf,
    RefreshCw,
    Plus,
    BarChart3,
    LogOut,
} from "lucide-react";

import { getFarms } from "../services/farmService";
import { getSoilRecords } from "../services/soilService";
import { getCropPredictionHistory } from "../services/cropService";
import { getWeatherHistory } from "../services/weatherService";

import {
    getPhStatus,
    getMoistureStatus,
} from "../utils/soilUtils";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // =========================================
    // STATE
    // =========================================

    const [farms, setFarms] = useState([]);
    const [soilRecords, setSoilRecords] = useState([]);
    const [cropPredictions, setCropPredictions] = useState([]);
    const [weatherHistory, setWeatherHistory] = useState([]);

    const [latestSoil, setLatestSoil] = useState(null);
    const [latestPrediction, setLatestPrediction] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    

    // =========================================
    // LOAD DASHBOARD DATA
    // =========================================

    const loadDashboardData = async (
        showRefreshing = false
    ) => {
        try {
            setError("");

            if (showRefreshing) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const [
    farmsResponse,
    soilResponse,
    cropResponse,
    weatherResponse,
] = await Promise.all([
    getFarms(),
    getSoilRecords(),
    getCropPredictionHistory(),
    getWeatherHistory(),
]);

            // -----------------------------------------
            // FARMS
            // -----------------------------------------

            const farmsData =
                farmsResponse?.farms ||
                farmsResponse?.data ||
                [];

            setFarms(farmsData);

            // -----------------------------------------
            // SOIL RECORDS
            // -----------------------------------------

            const soilData =
                soilResponse?.soilRecords ||
                soilResponse?.data ||
                [];

            setSoilRecords(soilData);

            if (soilData.length > 0) {
                setLatestSoil(soilData[0]);
            } else {
                setLatestSoil(null);
            }

            // -----------------------------------------
            // CROP PREDICTIONS
            // -----------------------------------------

            const cropData =
                cropResponse?.data ||
                cropResponse?.predictions ||
                [];

            setCropPredictions(cropData);

            if (cropData.length > 0) {
                setLatestPrediction(cropData[0]);
            } else {
                setLatestPrediction(null);
            }

            const weatherData =
                weatherResponse?.data ||
                weatherResponse?.weatherRecords ||
            [];

            setWeatherHistory(weatherData);

        } catch (error) {
            console.error(
                "Dashboard loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to load dashboard data."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // =========================================
    // LOAD DATA WHEN DASHBOARD OPENS
    // =========================================

    useEffect(() => {
        loadDashboardData();
    }, []);

    // =========================================
    // LOGOUT
    // =========================================


    // =========================================
    // REFRESH
    // =========================================

    const handleRefresh = () => {
        loadDashboardData(true);
    };

    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =========================================
    // CONFIDENCE
    // =========================================

    const getConfidencePercentage = (
        confidence
    ) => {
        if (
            confidence === undefined ||
            confidence === null
        ) {
            return 0;
        }

        return Math.round(
            Number(confidence) * 100
        );
    };

    // =========================================
    // LOADING SCREEN
    // =========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    <div className="flex min-h-[60vh] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-700"></div>

                            <p className="text-sm text-gray-500">
                                Loading your agriculture
                                dashboard...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const quickLinks = [
    {
        title: "Soil Analysis",
        description: "Analyze and review your soil data",
        icon: FlaskConical,
        path: "/soil-analysis",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-700",
    },
    {
        title: "AI Crop Recommendation",
        description: "Get AI-assisted crop recommendations",
        icon: BrainCircuit,
        path: "/crop-recommendation",
        iconBg: "bg-green-100",
        iconColor: "text-green-700",
    },
    {
        title: "Fertilizer Guidance",
        description: "View nutrient and fertilizer guidance",
        icon: Sprout,
        path: "/fertilizer",
        iconBg: "bg-lime-100",
        iconColor: "text-lime-700",
    },
    {
        title: "Irrigation Assistant",
        description: "Check irrigation guidance",
        icon: Droplets,
        path: "/irrigation",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
    },
    {
        title: "Current Weather",
        description: "Check current farm weather",
        icon: CloudSun,
        path: "/weather",
        iconBg: "bg-sky-100",
        iconColor: "text-sky-700",
    },
    {
        title: "Weather Forecast",
        description: "View upcoming weather conditions",
        icon: CalendarDays,
        path: "/weather-forecast",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-700",
    },
    {
        title: "Soil History",
        description: "Review previous soil analyses",
        icon: History,
        path: "/soil-history",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-700",
    },
    {
        title: "Crop History",
        description: "Review previous AI predictions",
        icon: Sprout,
        path: "/crop-history",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-700",
    },
    {
        title: "Weather History",
        description: "Review weather records and analytics",
        icon: CloudSun,
        path: "/weather-history",
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-700",
    },
    {
        title: "My Farms",
        description: "Manage your farms and crops",
        icon: Map,
        path: "/farms",
        iconBg: "bg-green-100",
        iconColor: "text-green-700",
    },
];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

            {/* =========================================
                MAIN CONTAINER
            ========================================= */}

            <div className="mx-auto max-w-7xl">

                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <div className="rounded-lg bg-green-100 p-2">
                                    <LayoutDashboard
                                        size={20}
                                        className="text-green-700"
                                    />
                                </div>

                                <p className="text-sm font-medium text-green-700">
                                    Farmer Dashboard
                                </p>
                            </div>

                            <p className="text-sm text-gray-500">
                                Welcome back
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                                {user?.name || "Farmer"}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                        

                        <div className="flex flex-wrap gap-3">

                            {/* REFRESH */}

                            <button
                                onClick={
                                    handleRefresh
                                }
                                disabled={refreshing}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={16}
                                    className={
                                        refreshing
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

                                {refreshing
                                    ? "Refreshing..."
                                    : "Refresh"}
                            </button>

                        </div>
                        
                    </div>

                    {/* ACCOUNT ROLE */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mt-4">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Account Role
                                </p>

                                <h2 className="mt-2 text-2xl font-bold capitalize text-green-700">
                                    {user?.role ||
                                        "Farmer"}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-purple-100 p-3">
                                <Activity
                                    size={24}
                                    className="text-purple-700"
                                />
                            </div>

                        </div>

                        <p className="mt-4 text-xs text-gray-500">
                            Your current account
                            access level
                        </p>

                    </div>
                </div>


                {/* =====================================
                    ERROR MESSAGE
                ===================================== */}

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                            <p className="text-sm text-red-700">
                                {error}
                            </p>

                            <button
                                onClick={
                                    handleRefresh
                                }
                                className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Try Again
                            </button>

                            

                        </div>
                        
                    </div>
                )}


                {/* =====================================
                    STAT CARDS
                ===================================== */}

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


                    {/* FARMS */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Farms
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {farms.length}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-green-100 p-3">
                                <Sprout
                                    size={24}
                                    className="text-green-700"
                                />
                            </div>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/farms")
                            }
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                        >
                            Manage farms
                            <ArrowRight
                                size={15}
                            />
                        </button>

                    </div>


                    {/* SOIL RECORDS */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Soil Analyses
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {
                                        soilRecords.length
                                    }
                                </h2>
                            </div>

                            <div className="rounded-xl bg-amber-100 p-3">
                                <FlaskConical
                                    size={24}
                                    className="text-amber-700"
                                />
                            </div>

                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/soil-history"
                                )
                            }
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                        >
                            View history
                            <ArrowRight
                                size={15}
                            />
                        </button>

                    </div>


                    {/* AI PREDICTIONS */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    AI Predictions
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                                    {
                                        cropPredictions.length
                                    }
                                </h2>
                            </div>

                            <div className="rounded-xl bg-blue-100 p-3">
                                <BrainCircuit
                                    size={24}
                                    className="text-blue-700"
                                />
                            </div>

                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/crop-history"
                                )
                            }
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                        >
                            View predictions
                            <ArrowRight
                                size={15}
                            />
                        </button>

                    </div>

                    {/* Weather History */}

<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

    <div className="flex items-start justify-between">

        <div>

            <p className="text-sm text-gray-500">
                Weather History
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {
                    weatherHistory.length
                }
            </h2>

        </div>

        <div className="rounded-xl bg-sky-100 p-3">

            <CloudSun
                size={24}
                className="text-sky-700"
            />

        </div>

    </div>

    <button
        onClick={() =>
            navigate(
                "/weather-history"
            )
        }
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
    >

        View weather history

        <ArrowRight
            size={15}
        />

    </button>

</div>

                </div>


                {/* =====================================
                    QUICK ACTIONS
                ===================================== */}

                <div className="mb-8">

                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Access your agriculture
                            tools quickly.
                        </p>
                    </div>


                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {/* ADD FARM */}

                        <button
                            onClick={() =>
                                navigate("/farms")
                            }
                            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <div className="rounded-xl bg-green-100 p-3">
                                    <Plus
                                        size={24}
                                        className="text-green-700"
                                    />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                                />

                            </div>

                            <h3 className="font-semibold text-gray-900">
                                Manage Farms
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Add, update or view your
                                farms.
                            </p>

                        </button>


                        {/* SOIL ANALYSIS */}

                        <button
                            onClick={() =>
                                navigate(
                                    "/soil-analysis"
                                )
                            }
                            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <div className="rounded-xl bg-amber-100 p-3">
                                    <FlaskConical
                                        size={24}
                                        className="text-amber-700"
                                    />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                                />

                            </div>

                            <h3 className="font-semibold text-gray-900">
                                Soil Analysis
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Record and analyze soil
                                parameters.
                            </p>

                        </button>


                        {/* CROP RECOMMENDATION */}

                        <button
                            onClick={() =>
                                navigate(
                                    "/crop-recommendation"
                                )
                            }
                            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <div className="rounded-xl bg-blue-100 p-3">
                                    <BrainCircuit
                                        size={24}
                                        className="text-blue-700"
                                    />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                                />

                            </div>

                            <h3 className="font-semibold text-gray-900">
                                AI Crop Recommendation
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Get an AI/ML-based crop
                                recommendation.
                            </p>

                        </button>


                        {/* FERTILIZER */}

                        <button
                            onClick={() =>
                                navigate(
                                    "/fertilizer"
                                )
                            }
                            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <div className="rounded-xl bg-yellow-100 p-3">
                                    <Leaf
                                        size={24}
                                        className="text-yellow-700"
                                    />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                                />

                            </div>

                            <h3 className="font-semibold text-gray-900">
                                Fertilizer Guidance
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Review nutrient status and
                                guidance.
                            </p>

                        </button>


                        {/* IRRIGATION */}

                        <button
                            onClick={() =>
                                navigate(
                                    "/irrigation"
                                )
                            }
                            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <div className="rounded-xl bg-cyan-100 p-3">
                                    <Droplets
                                        size={24}
                                        className="text-cyan-700"
                                    />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                                />

                            </div>

                            <h3 className="font-semibold text-gray-900">
                                Irrigation Assistant
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Review soil moisture and
                                irrigation guidance.
                            </p>

                        </button>


                        {/* WEATHER */}

                        <button
                            onClick={() =>
                                navigate("/weather")
                            }
                            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="mb-4 flex items-center justify-between">

                                <div className="rounded-xl bg-sky-100 p-3">
                                    <CloudSun
                                        size={24}
                                        className="text-sky-700"
                                    />
                                </div>

                                <ArrowRight
                                    size={18}
                                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-700"
                                />

                            </div>

                            <h3 className="font-semibold text-gray-900">
                                Weather
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Check current farm weather
                                conditions.
                            </p>

                        </button>

                        

                    </div>
                </div>


                {/* =====================================
                    LATEST SOIL + LATEST PREDICTION
                ===================================== */}

                <div className="mb-8 grid gap-6 lg:grid-cols-2">

                    {/* =================================
                        LATEST SOIL ANALYSIS
                    ================================= */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Latest Soil Analysis
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-gray-900">
                                    {latestSoil
                                        ?.farm
                                        ?.farmName ||
                                        "No analysis yet"}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-green-100 p-3">
                                <Sprout
                                    size={24}
                                    className="text-green-700"
                                />
                            </div>

                        </div>


                        {latestSoil ? (
                            <>
                                {/* NPK */}

                                <div className="mt-6 grid grid-cols-3 gap-3">

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">
                                            Nitrogen
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900">
                                            {
                                                latestSoil.nitrogen
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">
                                            Phosphorus
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900">
                                            {
                                                latestSoil.phosphorus
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">
                                            Potassium
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900">
                                            {
                                                latestSoil.potassium
                                            }
                                        </p>
                                    </div>

                                </div>


                                {/* PH + MOISTURE */}

                                <div className="mt-4 grid grid-cols-2 gap-4">

                                    <div className="rounded-xl border border-gray-100 p-4">

                                        <p className="text-xs text-gray-500">
                                            pH
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {
                                                latestSoil.ph
                                            }
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-green-700">
                                            {getPhStatus(
                                                latestSoil.ph
                                            )}
                                        </p>

                                    </div>


                                    <div className="rounded-xl border border-gray-100 p-4">

                                        <p className="text-xs text-gray-500">
                                            Moisture
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {
                                                latestSoil.moisture
                                            }
                                            %
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-blue-700">
                                            {getMoistureStatus(
                                                latestSoil.moisture
                                            )}
                                        </p>

                                    </div>

                                </div>


                                {/* DATE */}

                                <p className="mt-4 text-xs text-gray-400">
                                    Recorded on{" "}
                                    {formatDate(
                                        latestSoil.createdAt
                                    )}
                                </p>

                            </>
                        ) : (
                            <div className="mt-6 rounded-xl bg-gray-50 p-5">

                                <p className="text-sm text-gray-600">
                                    No soil analysis is
                                    available yet.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/soil-analysis"
                                        )
                                    }
                                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                                >
                                    Add soil analysis
                                    <ArrowRight
                                        size={15}
                                    />
                                </button>

                            </div>
                        )}

                    </div>


                    {/* =================================
                        LATEST AI PREDICTION
                    ================================= */}

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex items-start justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Latest AI Prediction
                                </p>

                                <h2 className="mt-1 text-xl font-bold capitalize text-gray-900">
                                    {latestPrediction
                                        ?.predictedCrop ||
                                        "No prediction yet"}
                                </h2>
                            </div>

                            <div className="rounded-xl bg-blue-100 p-3">
                                <BrainCircuit
                                    size={24}
                                    className="text-blue-700"
                                />
                            </div>

                        </div>


                        {latestPrediction ? (
                            <>

                                {/* PREDICTED CROP */}

                                <div className="mt-6 rounded-xl bg-green-50 p-5">

                                    <p className="text-xs font-medium uppercase tracking-wide text-green-700">
                                        Predicted Crop
                                    </p>

                                    <p className="mt-2 text-3xl font-bold capitalize text-green-800">
                                        {
                                            latestPrediction.predictedCrop
                                        }
                                    </p>

                                </div>


                                {/* CONFIDENCE */}

                                <div className="mt-5">

                                    <div className="mb-2 flex justify-between">

                                        <p className="text-sm font-medium text-gray-600">
                                            Model confidence
                                        </p>

                                        <p className="text-sm font-semibold text-gray-900">
                                            {getConfidencePercentage(
                                                latestPrediction.confidence
                                            )}
                                            %
                                        </p>

                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                                        <div
                                            className="h-full rounded-full bg-green-600 transition-all"
                                            style={{
                                                width: `${getConfidencePercentage(
                                                    latestPrediction.confidence
                                                )}%`,
                                            }}
                                        />

                                    </div>

                                </div>


                                {/* FARM */}

                                <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">

                                    <MapPin
                                        size={16}
                                        className="text-gray-400"
                                    />

                                    <span>
                                        {latestPrediction
                                            ?.farm
                                            ?.farmName ||
                                            "Farm"}
                                    </span>

                                </div>


                                {/* DATE */}

                                <p className="mt-2 text-xs text-gray-400">
                                    Predicted on{" "}
                                    {formatDate(
                                        latestPrediction.createdAt
                                    )}
                                </p>


                                {/* HISTORY */}

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/crop-history"
                                        )
                                    }
                                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                                >
                                    View prediction
                                    history
                                    <ArrowRight
                                        size={15}
                                    />
                                </button>

                                <p className="mt-4 rounded-lg bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                                    This result is an
                                    AI/ML-based
                                    decision-support
                                    prediction and should
                                    not be treated as a
                                    guaranteed agricultural
                                    outcome.
                                </p>

                            </>
                        ) : (
                            <div className="mt-6 rounded-xl bg-gray-50 p-5">

                                <p className="text-sm text-gray-600">
                                    You have not generated
                                    an AI crop prediction
                                    yet.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/crop-recommendation"
                                        )
                                    }
                                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                                >
                                    Generate prediction
                                    <ArrowRight
                                        size={15}
                                    />
                                </button>

                            </div>
                        )}

                    </div>

                </div>


                {/* =====================================
                    MY FARMS
                ===================================== */}

                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                My Farms
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your registered agricultural
                                fields.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/farms")
                            }
                            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-green-700 hover:underline"
                        >
                            Manage farms
                            <ArrowRight
                                size={15}
                            />
                        </button>

                    </div>


                    {farms.length > 0 ? (
                        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                            {farms
                                .slice(0, 6)
                                .map((farm) => (
                                    <div
                                        key={
                                            farm._id
                                        }
                                        className="rounded-xl border border-gray-200 p-5 transition hover:shadow-sm"
                                    >

                                        <div className="flex items-start justify-between">

                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {
                                                        farm.farmName
                                                    }
                                                </h3>

                                                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                                                    <MapPin
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    {
                                                        farm.location
                                                    }
                                                </div>
                                            </div>

                                            <Sprout
                                                size={
                                                    22
                                                }
                                                className="text-green-600"
                                            />

                                        </div>


                                        <div className="mt-4 grid grid-cols-2 gap-3">

                                            <div className="rounded-lg bg-gray-50 p-3">

                                                <p className="text-xs text-gray-500">
                                                    Area
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                                    {
                                                        farm.area
                                                    }{" "}
                                                    {
                                                        farm.areaUnit
                                                    }
                                                </p>

                                            </div>


                                            <div className="rounded-lg bg-gray-50 p-3">

                                                <p className="text-xs text-gray-500">
                                                    Soil
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                                    {
                                                        farm.soilType
                                                    }
                                                </p>

                                            </div>

                                        </div>


                                        <div className="mt-3 text-sm">

                                            <span className="text-gray-500">
                                                Current crop:
                                            </span>{" "}

                                            <span className="font-medium capitalize text-gray-800">
                                                {farm.currentCrop ||
                                                    "Not specified"}
                                            </span>

                                        </div>

                                    </div>
                                ))}

                        </div>
                    ) : (
                        <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">

                            <Sprout
                                size={40}
                                className="mx-auto text-gray-400"
                            />

                            <h3 className="mt-3 font-semibold text-gray-900">
                                No farms added yet
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Add your first farm to
                                start using the agriculture
                                tools.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/farms")
                                }
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-800"
                            >
                                <Plus size={16} />
                                Add Farm
                            </button>

                        </div>
                    )}

                </div>


                {/* =====================================
                    FOOTER INFORMATION
                ===================================== */}

                <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

                    <div className="flex gap-3">

                        <div className="mt-0.5">
                            <BarChart3
                                size={20}
                                className="text-green-700"
                            />
                        </div>

                        <div>

                            <h3 className="font-semibold text-green-900">
                                AI Smart Agriculture
                                Assistant
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-green-800">
                                Use soil information,
                                environmental conditions,
                                weather information and
                                AI/ML-based analysis to
                                support agricultural
                                decision-making. Results
                                are intended for decision
                                support and should be
                                considered along with local
                                agricultural knowledge and
                                expert advice.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;