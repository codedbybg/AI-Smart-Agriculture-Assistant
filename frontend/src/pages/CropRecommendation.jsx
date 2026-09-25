import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import { Sprout , Brain , Loader2 , AlertCircle , CheckCircle2 } from "lucide-react";

import Card from "../components/Card";
import {getFarms} from "../services/farmService";
import {getSoilRecordsByFarm} from "../services/soilService";
import {predictCrop} from "../services/cropService";


function CropRecommendation(){
    const [farms , setFarms ] = useState([]);
    const [soilRecords , setSoilRecords ] = useState([]);
    const [selectedFarm , setSelectedFarm] = useState("");
    const [ selectedSoilRecord , setSelectedSoilRecord ] = useState("");
    const [ rainfall , setRainfall ] = useState("");
    const [selectedSoil , setSelectedSoil ] = useState(null);
    const [prediction , setPrediction ] = useState(null);
    const [loadingFarms , setLoadingFarms ] = useState(true);
    const [loadingSoil, setLoadingSoil] = useState(false);
    const [predicting, setPredicting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

     // =====================================================
    // Load Farms
    // =====================================================
    useEffect(() => {

        const loadFarms = async () => {

            try {

                setLoadingFarms(true);
                setError("");

                const response = await getFarms();
                console.log("Farms API response:", response);

                setFarms(response.farms || response.data || []);

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Failed to load farms."
                );

            } finally {

                setLoadingFarms(false);

            }
        };

        loadFarms();

    }, []);

    // =====================================================
    // Load Soil Records when Farm changes
    // =====================================================

    useEffect(() => {

        if (!selectedFarm) {

            setSoilRecords([]);
            setSelectedSoilRecord("");
            setSelectedSoil(null);

            return;
        }


        const loadSoilRecords = async () => {

            try {

                setLoadingSoil(true);
                setError("");

                const response =
                    await getSoilRecordsByFarm(selectedFarm);

                    console.log("Soil API response:", response);

                setSoilRecords(
                    response.soilRecords || []
                );

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Failed to load soil records."
                );

            } finally {

                setLoadingSoil(false);

            }
        };


        loadSoilRecords();

    }, [selectedFarm]);

    // =====================================================
    // Select Soil Record
    // =====================================================

    const handleSoilRecordChange = (e) => {

        const soilId = e.target.value;

        setSelectedSoilRecord(soilId);

        const soil = soilRecords.find(
            (record) => record._id === soilId
        );

        setSelectedSoil(soil || null);

        setPrediction(null);
        setSuccess("");
        setError("");
    };


    // =====================================================
    // Generate Prediction
    // =====================================================

    const handlePredict = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setPrediction(null);


        if (!selectedFarm) {

            setError("Please select a farm.");

            return;
        }


        if (!selectedSoilRecord) {

            setError("Please select a soil record.");

            return;
        }


        if (
            rainfall === "" ||
            Number(rainfall) < 0
        ) {

            setError(
                "Please enter a valid rainfall value."
            );

            return;
        }


        try {

            setPredicting(true);

            const response = await predictCrop({

                farmId: selectedFarm,

                soilRecordId: selectedSoilRecord,

                rainfall: Number(rainfall),

            });


            setPrediction(
                response.data
            );

            setSuccess(
                "AI crop prediction generated successfully."
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to generate crop prediction."
            );

        } finally {

            setPredicting(false);

        }
    };

    return (
        <div className="space-y-6 mt-5">
        {/* =================================================
                Header
            ================================================= */}

            <div>

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-green-100 p-3">

                        <Sprout
                            className="text-green-700"
                            size={28}
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">

                            Crop Recommendation

                        </h1>

                        <p className="text-gray-600">

                            Get an AI-based crop recommendation
                            using your soil data.

                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                Error
            ================================================= */}

            {error && (

                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                    <AlertCircle size={20} />

                    <span>{error}</span>

                </div>

            )}


            {/* =================================================
                Success
            ================================================= */}

            {success && (

                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

                    <CheckCircle2 size={20} />

                    <span>{success}</span>

                </div>

            )}


            <div className="grid gap-6 lg:grid-cols-2">


                {/* =================================================
                    Input Card
                ================================================= */}

                <Card>

                    <div className="mb-6 flex items-center gap-3">

                        <Brain
                            className="text-green-700"
                            size={24}
                        />

                        <h2 className="text-xl font-semibold">

                            AI Crop Analysis

                        </h2>

                    </div>


                    <form
                        onSubmit={handlePredict}
                        className="space-y-5"
                    >


                        {/* Farm */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Select Farm

                            </label>

                            <select
                                value={selectedFarm}
                                onChange={(e) => {

                                    setSelectedFarm(
                                        e.target.value
                                    );

                                    setPrediction(null);
                                    setSuccess("");
                                    setError("");

                                }}
                                disabled={loadingFarms}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            >

                                <option value="">

                                    {loadingFarms
                                        ? "Loading farms..."
                                        : "Select a farm"}

                                </option>


                                {farms.map((farm) => (

                                    <option
                                        key={farm._id}
                                        value={farm._id}
                                    >

                                        {farm.farmName}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Soil Record */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Select Soil Record

                            </label>

                            <select
                                value={selectedSoilRecord}
                                onChange={
                                    handleSoilRecordChange
                                }
                                disabled={
                                    !selectedFarm ||
                                    loadingSoil
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            >

                                <option value="">

                                    {loadingSoil
                                        ? "Loading soil records..."
                                        : "Select a soil record"}

                                </option>


                                {soilRecords.map(
                                    (record) => (

                                        <option
                                            key={record._id}
                                            value={record._id}
                                        >

                                            {new Date(
                                                record.createdAt
                                            ).toLocaleDateString()}

                                            {" — "}

                                            pH: {record.ph}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* Rainfall */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">

                                Rainfall (mm)

                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={rainfall}
                                onChange={(e) =>
                                    setRainfall(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter rainfall"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <p className="mt-1 text-xs text-gray-500">

                                Enter the rainfall value used
                                for this prediction.

                            </p>

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={predicting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {predicting ? (

                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />

                                    Generating...

                                </>

                            ) : (

                                <>
                                    <Brain size={20} />

                                    Get Crop Recommendation

                                </>

                            )}

                        </button>

                    </form>

                </Card>


                {/* =================================================
                    Soil Data Card
                ================================================= */}

                <Card>

                    <h2 className="mb-5 text-xl font-semibold">

                        Selected Soil Data

                    </h2>


                    {!selectedSoil ? (

                        <div className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">

                            Select a soil record to view
                            its data.

                        </div>

                    ) : (

                        <div className="grid grid-cols-2 gap-4">

                            <SoilValue
                                label="Nitrogen (N)"
                                value={selectedSoil.nitrogen}
                            />

                            <SoilValue
                                label="Phosphorus (P)"
                                value={selectedSoil.phosphorus}
                            />

                            <SoilValue
                                label="Potassium (K)"
                                value={selectedSoil.potassium}
                            />

                            <SoilValue
                                label="pH"
                                value={selectedSoil.ph}
                            />

                            <SoilValue
                                label="Moisture (%)"
                                value={selectedSoil.moisture}
                            />

                            <SoilValue
                                label="Temperature (°C)"
                                value={selectedSoil.temperature}
                            />

                            <SoilValue
                                label="Humidity (%)"
                                value={selectedSoil.humidity}
                            />

                        </div>

                    )}

                </Card>

            </div>


            {/* =================================================
                Prediction Result
            ================================================= */}

            {prediction && (

                <Card>

                    <div className="mb-6 flex items-center gap-3">

                        <div className="rounded-xl bg-green-100 p-3">

                            <Sprout
                                className="text-green-700"
                                size={26}
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold">

                                AI Prediction Result

                            </h2>

                            <p className="text-sm text-gray-500">

                                Machine-learning decision-support
                                result

                            </p>

                        </div>

                    </div>


                    {/* Main prediction */}

                    <div className="mb-6 rounded-2xl bg-green-50 p-6 text-center">

                        <p className="text-sm font-medium text-green-800">

                            Predicted Crop

                        </p>

                        <h3 className="mt-2 text-4xl font-bold capitalize text-green-900">

                            {prediction.predictedCrop}

                        </h3>

                        <p className="mt-3 text-sm text-gray-600">

                            Model confidence:{" "}

                            {(
                                prediction.confidence * 100
                            ).toFixed(2)}

                            %

                        </p>

                    </div>


                    {/* Top predictions */}

                    <div>

                        <h3 className="mb-4 text-lg font-semibold">

                            Top Candidate Crops

                        </h3>


                        <div className="space-y-3">

                            {prediction.topPredictions?.map(
                                (item, index) => (

                                    <div
                                        key={item.crop}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                                    >

                                        <div className="flex items-center gap-3">

                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">

                                                {index + 1}

                                            </span>

                                            <span className="font-medium capitalize">

                                                {item.crop}

                                            </span>

                                        </div>

                                        <span className="font-semibold text-green-700">

                                            {(
                                                item.probability *
                                                100
                                            ).toFixed(2)}

                                            %

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* Disclaimer */}

                    <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">

                        <strong>Note:</strong>{" "}

                        This result is an AI/ML-based
                        decision-support prediction. It is
                        not a guaranteed crop outcome or a
                        substitute for professional
                        agricultural advice.

                    </div>

                </Card>

            )}


            {/* No farms */}

            {!loadingFarms && farms.length === 0 && (

                <Card>

                    <div className="text-center">

                        <p className="text-gray-600">

                            You don't have any farms yet.

                        </p>

                        <Link
                            to="/farms"
                            className="mt-4 inline-block font-medium text-green-700 hover:underline"
                        >

                            Add your first farm →

                        </Link>

                    </div>

                </Card>

            )}

        </div>
    );
}


// =====================================================
// Soil Value Component
// =====================================================

function SoilValue({ label, value }) {

    return (

        <div className="rounded-xl bg-gray-50 p-4">

            <p className="text-xs font-medium text-gray-500">

                {label}

            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">

                {value}

            </p>

        </div>

    );
}

export default CropRecommendation;