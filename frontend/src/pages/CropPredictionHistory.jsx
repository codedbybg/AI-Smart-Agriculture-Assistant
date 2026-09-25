import { useEffect, useState } from "react";
import {
    Sprout,
    Loader2,
    AlertCircle,
    CalendarDays,
    MapPin,
    Brain,
    // Droplets,
    // Thermometer,
    // FlaskConical,
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import Card from "../components/Card";

import {
    getCropPredictionHistory,
} from "../services/cropService";


function CropPredictionHistory() {

    const [predictions, setPredictions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // Load Prediction History
    // =====================================================

    useEffect(() => {

        const loadHistory = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getCropPredictionHistory();

                setPredictions(
                    response.data || []
                );

            } catch (err) {

                console.error(err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load prediction history."
                );

            } finally {

                setLoading(false);

            }
        };


        loadHistory();

    }, []);


    // =====================================================
    // Loading
    // =====================================================

    if (loading) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="flex items-center gap-3 text-gray-600">

                    <Loader2
                        size={24}
                        className="animate-spin"
                    />

                    Loading prediction history...

                </div>

            </div>

        );
    }


    // =====================================================
    // Error
    // =====================================================

    if (error) {

        return (

            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                <AlertCircle size={20} />

                <span>{error}</span>

            </div>

        );
    }


    return (

        <div className="space-y-6 p-3">


            {/* =================================================
                Header
            ================================================= */}

            <div>

                <div className="flex items-center gap-3 mt-8">

                    <div className="rounded-xl bg-green-100 p-3">

                        <Brain
                            size={28}
                            className="text-green-700"
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">

                            Crop Prediction History

                        </h1>

                        <p className="text-gray-600">

                            Review your previous AI-based
                            crop predictions.

                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                Empty State
            ================================================= */}

            {predictions.length === 0 && (

                <Card>

                    <div className="py-12 text-center">

                        <Sprout
                            size={48}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-4 text-xl font-semibold text-gray-800">

                            No predictions yet

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Generate your first crop
                            recommendation to see it here.

                        </p>

                    </div>

                </Card>

            )}


            {/* =================================================
                Statistics
            ================================================= */}

            {predictions.length > 0 && (

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <StatCard
                        title="Total Predictions"
                        value={predictions.length}
                        icon={<Brain size={22} />}
                    />

                    <StatCard
                        title="Latest Crop"
                        value={
                            predictions[0]
                                ?.predictedCrop || "-"
                        }
                        icon={<Sprout size={22} />}
                    />

                    <StatCard
                        title="Latest Confidence"
                        value={
                            predictions[0]?.confidence !==
                            undefined
                                ? `${(
                                      predictions[0]
                                          .confidence * 100
                                  ).toFixed(2)}%`
                                : "-"
                        }
                        icon={<Brain size={22} />}
                    />

                </div>

            )}


            {/* =================================================
                Confidence Chart
            ================================================= */}

            {predictions.length > 0 && (

                <Card>

                    <div className="mb-5">

                        <h2 className="text-xl font-semibold">

                            Prediction Confidence

                        </h2>

                        <p className="text-sm text-gray-500">

                            Model confidence for recent
                            predictions.

                        </p>

                    </div>


                    <div className="h-72 w-full">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={predictions
                                    .slice(0, 10)
                                    .reverse()
                                    .map(
                                        (
                                            prediction,
                                            index
                                        ) => ({
                                            name:
                                                prediction
                                                    .predictedCrop ||
                                                `Prediction ${
                                                    index + 1
                                                }`,
                                            confidence:
                                                Number(
                                                    (
                                                        prediction.confidence *
                                                        100
                                                    ).toFixed(2)
                                                ),
                                        })
                                    )}
                            >

                                <XAxis
                                    dataKey="name"
                                />

                                <YAxis
                                    domain={[0, 100]}
                                    unit="%"
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        `${value}%`,
                                        "Confidence",
                                    ]}
                                />

                                <Bar
                                    dataKey="confidence"
                                    radius={[
                                        6,
                                        6,
                                        0,
                                        0,
                                    ]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </Card>

            )}


            {/* =================================================
                Prediction Cards
            ================================================= */}

            <div className="space-y-5">

                {predictions.map(
                    (prediction) => (

                        <PredictionCard
                            key={prediction._id}
                            prediction={prediction}
                        />

                    )
                )}

            </div>

        </div>
    );
}


// =====================================================
// Stat Card
// =====================================================

function StatCard({
    title,
    value,
    icon,
}) {

    return (

        <Card>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">

                        {title}

                    </p>

                    <p className="mt-1 text-2xl font-bold capitalize text-gray-900">

                        {value}

                    </p>

                </div>

                <div className="rounded-xl bg-green-100 p-3 text-green-700">

                    {icon}

                </div>

            </div>

        </Card>
    );
}


// =====================================================
// Prediction Card
// =====================================================

function PredictionCard({
    prediction,
}) {

    const confidence =
        Number(prediction.confidence || 0) * 100;


    return (

        <Card>

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-green-100 p-3">

                            <Sprout
                                size={24}
                                className="text-green-700"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">

                                Predicted Crop

                            </p>

                            <h2 className="text-2xl font-bold capitalize text-gray-900">

                                {prediction.predictedCrop}

                            </h2>

                        </div>

                    </div>

                </div>


                <div className="rounded-xl bg-green-50 px-5 py-3 text-center">

                    <p className="text-xs text-green-700">

                        Model Confidence

                    </p>

                    <p className="text-xl font-bold text-green-900">

                        {confidence.toFixed(2)}%

                    </p>

                </div>

            </div>


            {/* Metadata */}

            <div className="mt-6 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">

                <InfoItem
                    icon={<MapPin size={18} />}
                    label="Farm"
                    value={
                        prediction.farm
                            ?.farmName || "Unknown"
                    }
                />

                <InfoItem
                    icon={<MapPin size={18} />}
                    label="Location"
                    value={
                        prediction.farm
                            ?.location || "Unknown"
                    }
                />

                <InfoItem
                    icon={
                        <CalendarDays size={18} />
                    }
                    label="Date"
                    value={
                        prediction.createdAt
                            ? new Date(
                                  prediction.createdAt
                              ).toLocaleString()
                            : "Unknown"
                    }
                />

            </div>


            {/* Input Values */}

            <div className="mt-6">

                <h3 className="mb-4 text-lg font-semibold">

                    Prediction Inputs

                </h3>


                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

                    <InputValue
                        label="Nitrogen"
                        value={
                            prediction.inputs?.N
                        }
                    />

                    <InputValue
                        label="Phosphorus"
                        value={
                            prediction.inputs?.P
                        }
                    />

                    <InputValue
                        label="Potassium"
                        value={
                            prediction.inputs?.K
                        }
                    />

                    <InputValue
                        label="pH"
                        value={
                            prediction.inputs?.ph
                        }
                    />

                    <InputValue
                        label="Temperature"
                        value={
                            prediction.inputs
                                ?.temperature
                        }
                        suffix="°C"
                    />

                    <InputValue
                        label="Humidity"
                        value={
                            prediction.inputs
                                ?.humidity
                        }
                        suffix="%"
                    />

                    <InputValue
                        label="Rainfall"
                        value={
                            prediction.inputs
                                ?.rainfall
                        }
                        suffix="mm"
                    />

                </div>

            </div>


            {/* Top Predictions */}

            {prediction.topPredictions?.length >
                0 && (

                <div className="mt-6">

                    <h3 className="mb-4 text-lg font-semibold">

                        Top Candidate Crops

                    </h3>


                    <div className="space-y-3">

                        {prediction.topPredictions.map(
                            (item, index) => {

                                const probability =
                                    Number(
                                        item.probability
                                    ) * 100;

                                return (

                                    <div
                                        key={`${item.crop}-${index}`}
                                        className="flex items-center gap-4"
                                    >

                                        <div className="w-8 text-sm font-semibold text-gray-500">

                                            {index + 1}

                                        </div>


                                        <div className="min-w-24 capitalize font-medium">

                                            {item.crop}

                                        </div>


                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">

                                            <div
                                                className="h-full rounded-full bg-green-600"
                                                style={{
                                                    width: `${Math.min(
                                                        probability,
                                                        100
                                                    )}%`,
                                                }}
                                            />

                                        </div>


                                        <div className="w-16 text-right text-sm font-semibold">

                                            {probability.toFixed(
                                                2
                                            )}

                                            %

                                        </div>

                                    </div>

                                );
                            }
                        )}

                    </div>

                </div>

            )}


            {/* Disclaimer */}

            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">

                This historical result represents an
                AI/ML model prediction based on the
                recorded input values. It is not a
                guaranteed agricultural outcome.

            </div>

        </Card>
    );
}


// =====================================================
// Info Item
// =====================================================

function InfoItem({
    icon,
    label,
    value,
}) {

    return (

        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">

            <div className="text-gray-500">

                {icon}

            </div>

            <div className="min-w-0">

                <p className="text-xs text-gray-500">

                    {label}

                </p>

                <p className="truncate text-sm font-medium text-gray-900">

                    {value}

                </p>

            </div>

        </div>
    );
}


// =====================================================
// Input Value
// =====================================================

function InputValue({
    label,
    value,
    suffix = "",
}) {

    return (

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">

            <p className="text-xs text-gray-500">

                {label}

            </p>

            <p className="mt-1 font-semibold text-gray-900">

                {value ?? "-"} {suffix}

            </p>

        </div>
    );
}


export default CropPredictionHistory;