import { useEffect, useState } from "react";

import {
    Droplets,
    Thermometer,
    CloudSun,
    Sprout,
    CheckCircle,
    AlertCircle,
    Loader2,
    Waves,
} from "lucide-react";

import { getFarms } from "../services/farmService";

import { getSoilRecordsByFarm } from "../services/soilService";

import { analyzeIrrigation } from "../services/irrigationService";


function Irrigation() {

    // --------------------------------
    // State
    // --------------------------------

    const [farms, setFarms] = useState([]);

    const [soilRecords, setSoilRecords] =
        useState([]);

    const [selectedFarm, setSelectedFarm] =
        useState("");

    const [selectedSoilRecord, setSelectedSoilRecord] =
        useState("");

    const [result, setResult] =
        useState(null);

    const [loadingFarms, setLoadingFarms] =
        useState(true);

    const [loadingSoilRecords, setLoadingSoilRecords] =
        useState(false);

    const [analyzing, setAnalyzing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // --------------------------------
    // Load farms when page opens
    // --------------------------------

    useEffect(() => {
        loadFarms();
    }, []);


    // --------------------------------
    // Load farms
    // --------------------------------

    const loadFarms = async () => {

        try {

            setLoadingFarms(true);

            setError("");

            const response =
                await getFarms();


            console.log(
                "Irrigation - Farms API response:",
                response
            );


            // Backend response:
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


    // --------------------------------
    // Farm changed
    // --------------------------------

    const handleFarmChange = async (
        event
    ) => {

        const farmId =
            event.target.value;


        // Set farm

        setSelectedFarm(
            farmId
        );


        // Reset soil selection

        setSelectedSoilRecord("");

        setSoilRecords([]);


        // Reset result

        setResult(null);

        setSuccess("");

        setError("");


        // Nothing selected

        if (!farmId) {
            return;
        }


        try {

            setLoadingSoilRecords(
                true
            );


            const response =
                await getSoilRecordsByFarm(
                    farmId
                );


            console.log(
                "Irrigation - Soil API response:",
                response
            );


            // Backend response:
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

            setLoadingSoilRecords(
                false
            );
        }
    };


    // --------------------------------
    // Soil record changed
    // --------------------------------

    const handleSoilRecordChange = (
        event
    ) => {

        const soilRecordId =
            event.target.value;


        setSelectedSoilRecord(
            soilRecordId
        );


        setResult(null);

        setSuccess("");

        setError("");
    };


    // --------------------------------
    // Analyze irrigation
    // --------------------------------

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
                await analyzeIrrigation({
                    farmId:
                        selectedFarm,

                    soilRecordId:
                        selectedSoilRecord,
                });


            console.log(
                "Irrigation analysis response:",
                response
            );


            if (!response.success) {

                throw new Error(
                    response.message ||
                    "Failed to analyze irrigation conditions."
                );
            }


            setResult(
                response.data
            );


            setSuccess(
                "Irrigation guidance generated successfully."
            );

        } catch (error) {

            console.error(
                "Irrigation analysis error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to generate irrigation guidance."
            );

        } finally {

            setAnalyzing(false);
        }
    };


    // --------------------------------
    // Moisture status style
    // --------------------------------

    const getMoistureClasses = (
        status
    ) => {

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


    // --------------------------------
    // Render
    // --------------------------------

    return (

        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">


                {/* Header */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

                            <Droplets size={26} />

                        </div>


                        <div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">

                                Irrigation Assistant

                            </h1>

                            <p className="mt-1 text-sm text-gray-600">

                                Analyze soil moisture and field
                                conditions for irrigation
                                decision support.

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


                {/* Selection */}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-gray-900">

                            Select Farm & Soil Record

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            Select a farm and soil record to
                            analyze current field conditions.

                        </p>

                    </div>


                    <div className="grid gap-6 md:grid-cols-2">


                        {/* Farm */}

                        <div>

                            <label
                                htmlFor="irrigationFarm"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Select Farm
                            </label>


                            <select
                                id="irrigationFarm"
                                value={selectedFarm}
                                onChange={
                                    handleFarmChange
                                }
                                disabled={
                                    loadingFarms
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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


                        {/* Soil */}

                        <div>

                            <label
                                htmlFor="irrigationSoil"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Select Soil Record
                            </label>


                            <select
                                id="irrigationSoil"
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
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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

                                            Moisture:{" "}
                                            {
                                                record.moisture
                                            }%

                                            {" | Temp: "}

                                            {
                                                record.temperature
                                            }°C

                                            {" | Humidity: "}

                                            {
                                                record.humidity
                                            }%

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


                    {/* Analyze */}

                    <div className="mt-6">

                        <button
                            type="button"
                            onClick={
                                handleAnalyze
                            }
                            disabled={
                                analyzing ||
                                !selectedFarm ||
                                !selectedSoilRecord
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
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

                                    <Droplets
                                        size={18}
                                    />

                                    Analyze Irrigation

                                </>

                            )}

                        </button>

                    </div>

                </div>


                {/* Result */}

                {result && (

                    <div className="mt-8 space-y-6">


                        {/* Farm information */}

                        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">

                                    <Waves size={24} />

                                </div>


                                <div>

                                    <h2 className="text-xl font-bold text-gray-900">

                                        Irrigation Analysis Result

                                    </h2>


                                    <p className="mt-1 text-sm text-gray-600">

                                        Farm:{" "}

                                        <span className="font-medium">

                                            {result.farm?.name ||
                                                "Selected Farm"}

                                        </span>

                                    </p>


                                    <p className="mt-1 text-sm text-gray-600">

                                        Crop:{" "}

                                        <span className="font-medium">

                                            {result.farmConditions
                                                ?.currentCrop ||
                                                "Not specified"}

                                        </span>

                                    </p>


                                    <p className="mt-1 text-sm text-gray-600">

                                        Irrigation Source:{" "}

                                        <span className="font-medium">

                                            {result.farmConditions
                                                ?.irrigationSource ||
                                                "Not specified"}

                                        </span>

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Current Conditions */}

                        <div>

                            <h2 className="mb-4 text-xl font-semibold text-gray-900">

                                Current Conditions

                            </h2>


                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


                                {/* Moisture */}

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">

                                                Soil Moisture

                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-gray-900">

                                                {
                                                    result.inputs
                                                        ?.moisture
                                                }%

                                            </p>

                                        </div>


                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">

                                            <Droplets
                                                size={24}
                                            />

                                        </div>

                                    </div>


                                    <div className="mt-4">

                                        <span
                                            className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${getMoistureClasses(
                                                result.moistureStatus
                                            )}`}
                                        >

                                            {
                                                result.moistureStatus ||
                                                "Unknown"
                                            }

                                        </span>

                                    </div>

                                </div>


                                {/* Temperature */}

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">

                                                Temperature

                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-gray-900">

                                                {
                                                    result.inputs
                                                        ?.temperature
                                                }°C

                                            </p>

                                        </div>


                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700">

                                            <Thermometer
                                                size={24}
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* Humidity */}

                                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">

                                                Humidity

                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-gray-900">

                                                {
                                                    result.inputs
                                                        ?.humidity
                                                }%

                                            </p>

                                        </div>


                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">

                                            <CloudSun
                                                size={24}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Moisture Status */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">

                                    <Sprout
                                        size={23}
                                    />

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">

                                        Moisture Status

                                    </p>

                                    <p className="text-2xl font-bold text-gray-900">

                                        {
                                            result.moistureStatus ||
                                            "Unknown"
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Guidance */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-xl font-semibold text-gray-900">

                                Irrigation Guidance

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

                                        This module provides irrigation
                                        decision-support information
                                        based on the selected soil
                                        record and farm conditions.
                                        It does not automatically
                                        control irrigation equipment
                                        or provide a fixed irrigation
                                        schedule.

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


export default Irrigation;