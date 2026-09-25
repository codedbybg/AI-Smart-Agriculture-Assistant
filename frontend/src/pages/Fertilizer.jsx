import { useEffect, useState } from "react";

import {
    CheckCircle,
    AlertCircle,
    Leaf,
    FlaskConical,
    Sprout,
    Loader2,
} from "lucide-react";

import { getFarms } from "../services/farmService";

import { getSoilRecordsByFarm } from "../services/soilService";

import { analyzeFertilizer } from "../services/fertilizerService";


function Fertilizer() {

    // -----------------------------
    // State
    // -----------------------------

    const [farms, setFarms] = useState([]);

    const [soilRecords, setSoilRecords] = useState([]);

    const [selectedFarm, setSelectedFarm] = useState("");

    const [selectedSoilRecord, setSelectedSoilRecord] =
        useState("");

    const [result, setResult] = useState(null);

    const [loadingFarms, setLoadingFarms] =
        useState(true);

    const [loadingSoilRecords, setLoadingSoilRecords] =
        useState(false);

    const [analyzing, setAnalyzing] =
        useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] =
        useState("");


    // -----------------------------
    // Load farms when page opens
    // -----------------------------

    useEffect(() => {
        loadFarms();
    }, []);


    // -----------------------------
    // Load farms
    // -----------------------------

    const loadFarms = async () => {

        try {

            setLoadingFarms(true);

            setError("");

            const response = await getFarms();

            console.log(
                "Fertilizer - Farms API response:",
                response
            );


            // Your backend returns:
            //
            // {
            //   success: true,
            //   count: 3,
            //   farms: [...]
            // }

            setFarms(
                response.farms || []
            );

        } catch (error) {

            console.error(
                "Failed to load farms:",
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


    // -----------------------------
    // Farm changed
    // -----------------------------

    const handleFarmChange = async (event) => {

        const farmId =
            event.target.value;


        // Update selected farm

        setSelectedFarm(farmId);


        // Reset soil record

        setSelectedSoilRecord("");

        setSoilRecords([]);


        // Remove previous result

        setResult(null);

        setSuccess("");

        setError("");


        // If no farm selected

        if (!farmId) {
            return;
        }


        try {

            setLoadingSoilRecords(true);

            const response =
                await getSoilRecordsByFarm(
                    farmId
                );


            console.log(
                "Fertilizer - Soil API response:",
                response
            );


            // Your backend returns:
            //
            // {
            //   success: true,
            //   count: 1,
            //   soilRecords: [...]
            // }

            setSoilRecords(
                response.soilRecords || []
            );

        } catch (error) {

            console.error(
                "Failed to load soil records:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load soil records."
            );

        } finally {

            setLoadingSoilRecords(false);
        }
    };


    // -----------------------------
    // Soil record changed
    // -----------------------------

    const handleSoilRecordChange = (event) => {

        const soilRecordId =
            event.target.value;


        setSelectedSoilRecord(
            soilRecordId
        );

        setResult(null);

        setSuccess("");

        setError("");
    };


    // -----------------------------
    // Analyze fertilizer
    // -----------------------------

    const handleAnalyze = async () => {

        setError("");

        setSuccess("");

        setResult(null);


        if (!selectedFarm) {

            setError(
                "Please select a farm."
            );

            return;
        }


        if (!selectedSoilRecord) {

            setError(
                "Please select a soil record."
            );

            return;
        }


        try {

            setAnalyzing(true);


            const response =
                await analyzeFertilizer({
                    farmId: selectedFarm,

                    soilRecordId:
                        selectedSoilRecord,
                });


            console.log(
                "Fertilizer analysis response:",
                response
            );


            if (!response.success) {

                throw new Error(
                    response.message ||
                    "Failed to analyze fertilizer guidance."
                );
            }


            setResult(
                response.data
            );


            setSuccess(
                "Fertilizer guidance generated successfully."
            );

        } catch (error) {

            console.error(
                "Fertilizer analysis error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to generate fertilizer guidance."
            );

        } finally {

            setAnalyzing(false);
        }
    };


    // -----------------------------
    // Helper: nutrient status style
    // -----------------------------

    const getStatusClasses = (status) => {

        switch (
            status?.toLowerCase()
        ) {

            case "low":

                return "bg-red-50 text-red-700 border-red-200";

            case "moderate":

                return "bg-yellow-50 text-yellow-700 border-yellow-200";

            case "high":

                return "bg-green-50 text-green-700 border-green-200";

            default:

                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };


    // -----------------------------
    // Helper: nutrient icon
    // -----------------------------

    const NutrientCard = ({
        title,
        value,
        status,
        symbol,
    }) => {

        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm font-medium text-gray-500">
                            {title}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {value}
                        </p>

                    </div>


                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">

                        <span className="text-lg font-bold">
                            {symbol}
                        </span>

                    </div>

                </div>


                <div className="mt-4">

                    <span
                        className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${getStatusClasses(
                            status
                        )}`}
                    >
                        {status || "Unknown"}
                    </span>

                </div>

            </div>
        );
    };


    // -----------------------------
    // Render
    // -----------------------------

    return (

        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">


                {/* Header */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

                            <FlaskConical size={25} />

                        </div>


                        <div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">

                                Fertilizer Guidance

                            </h1>

                            <p className="mt-1 text-sm text-gray-600">

                                Analyze soil nutrient status and get
                                general fertilizer decision support.

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


                {/* Selection Card */}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-gray-900">

                            Select Soil Information

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Select a farm and one of its soil records
                            to analyze nutrient status.

                        </p>

                    </div>


                    <div className="grid gap-6 md:grid-cols-2">


                        {/* Farm */}

                        <div>

                            <label
                                htmlFor="farm"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Select Farm
                            </label>


                            <select
                                id="farm"
                                value={selectedFarm}
                                onChange={handleFarmChange}
                                disabled={loadingFarms}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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


                        {/* Soil Record */}

                        <div>

                            <label
                                htmlFor="soilRecord"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Select Soil Record
                            </label>


                            <select
                                id="soilRecord"
                                value={
                                    selectedSoilRecord
                                }
                                onChange={
                                    handleSoilRecordChange
                                }
                                disabled={
                                    !selectedFarm ||
                                    loadingSoilRecords
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                            >

                                <option value="">

                                    {!selectedFarm
                                        ? "Select a farm first"
                                        : loadingSoilRecords
                                        ? "Loading soil records..."
                                        : "Select a soil record"}

                                </option>


                                {soilRecords.map(
                                    (record) => (

                                        <option
                                            key={record._id}
                                            value={record._id}
                                        >

                                            N:{" "}
                                            {record.nitrogen}

                                            {" | "}

                                            P:{" "}
                                            {record.phosphorus}

                                            {" | "}

                                            K:{" "}
                                            {record.potassium}

                                            {" | pH: "}

                                            {record.ph}

                                        </option>

                                    )
                                )}

                            </select>


                            {selectedFarm &&
                                !loadingSoilRecords &&
                                soilRecords.length === 0 && (

                                    <p className="mt-2 text-sm text-yellow-700">

                                        No soil records found for
                                        this farm. Please add a soil
                                        record first.

                                    </p>

                                )}

                        </div>

                    </div>


                    {/* Analyze Button */}

                    <div className="mt-6">

                        <button
                            type="button"
                            onClick={handleAnalyze}
                            disabled={
                                analyzing ||
                                !selectedFarm ||
                                !selectedSoilRecord
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {analyzing ? (

                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Analyzing...

                                </>

                            ) : (

                                <>
                                    <FlaskConical
                                        size={18}
                                    />

                                    Analyze Fertilizer Guidance
                                </>

                            )}

                        </button>

                    </div>

                </div>


                {/* Result */}

                {result && (

                    <div className="mt-8 space-y-6">


                        {/* Result Header */}

                        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                    <Leaf size={24} />

                                </div>


                                <div>

                                    <h2 className="text-xl font-bold text-gray-900">

                                        Fertilizer Guidance Result

                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">

                                        Farm:{" "}

                                        <span className="font-medium">

                                            {result.farm?.name ||
                                                "Selected Farm"}

                                        </span>

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Nutrient Cards */}

                        <div>

                            <h2 className="mb-4 text-xl font-semibold text-gray-900">

                                Soil Nutrient Status

                            </h2>


                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                                <NutrientCard
                                    title="Nitrogen (N)"
                                    value={
                                        result.inputs?.nitrogen
                                    }
                                    status={
                                        result.nutrientStatus
                                            ?.nitrogen
                                    }
                                    symbol="N"
                                />


                                <NutrientCard
                                    title="Phosphorus (P)"
                                    value={
                                        result.inputs?.phosphorus
                                    }
                                    status={
                                        result.nutrientStatus
                                            ?.phosphorus
                                    }
                                    symbol="P"
                                />


                                <NutrientCard
                                    title="Potassium (K)"
                                    value={
                                        result.inputs?.potassium
                                    }
                                    status={
                                        result.nutrientStatus
                                            ?.potassium
                                    }
                                    symbol="K"
                                />

                            </div>

                        </div>


                        {/* pH */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">

                                    <Sprout size={22} />

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">
                                        Soil pH
                                    </p>

                                    <p className="text-2xl font-bold text-gray-900">

                                        {result.inputs?.ph}

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Guidance */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-xl font-semibold text-gray-900">

                                Guidance

                            </h2>


                            <div className="space-y-3">

                                {result.guidance?.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
                                        >

                                            <CheckCircle
                                                size={20}
                                                className="mt-0.5 shrink-0 text-green-600"
                                            />

                                            <p className="text-sm leading-6 text-gray-700">

                                                {item}

                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                        {/* Disclaimer */}

                        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

                            <div className="flex items-start gap-3">

                                <AlertCircle
                                    size={20}
                                    className="mt-0.5 shrink-0 text-yellow-700"
                                />

                                <div>

                                    <h3 className="font-semibold text-yellow-900">

                                        Important Note

                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-yellow-800">

                                        This module provides general
                                        decision-support information
                                        based on the selected soil
                                        record. It does not prescribe
                                        universal fertilizer doses.
                                        Follow crop-specific soil-test
                                        recommendations and local
                                        agricultural guidance before
                                        applying fertilizers.

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


export default Fertilizer;