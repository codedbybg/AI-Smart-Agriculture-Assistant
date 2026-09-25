import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";

import { getSoilRecords } from "../services/soilService";

function SoilHistory(){
    const navigate = useNavigate();

    const [ soilRecords , setSoilRecords ] = useState([]);

    const [ loading , setLoading ] = useState(true);
    const [ error , setError ] = useState("");

    const loadSoilRecords = async ()=>{
        try {
            setLoading(true);
            setError("");

            const data = await getSoilRecords();

            setSoilRecords(data.soilRecords || []);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message || "Failed to load soil history"
            );
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadSoilRecords();
    },[]);

    const formatDate = (date)=>{
        return new Date(date).toLocaleString("en-IN" , {
            day : "2-digit",
            month : "short",
            year : "numeric",
            hour : "2-digit",
            minute : "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={()=>navigate("/dashboard")}
                        className="mb-4 text-sm font-medium text-green-700 hover:text-green-800"
                    >
                        ← Back to Dashboard
                    </button>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Soil Analysis History
                            </h1>

                            <p className="mt-2 text-gray-600">
                                View your previously saved soil analysis records.
                            </p>
                        </div>
                        <button
                            onClick={()=>navigate("/soil-analysis")}
                            className="p-2 rounded-lg bg-green-700 text-white hover:bg-green-800 hover:cursor-pointer"
                        >
                            + New Analysis
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <Card>
                        <div className="py-10 text-center">
                            <p className="text-gray-500">
                                Loading soil history...
                            </p>
                        </div>
                    </Card>
                )}

                {/* Empty */}
                {!loading && soilRecords.length === 0 && (
                    <Card>

                        <div className="py-12 text-center">

                            <div className="mb-4 text-5xl">
                                🌱
                            </div>

                            <h2 className="text-xl font-semibold text-gray-900">
                                No soil analysis found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-gray-600">
                                You haven't saved any soil analysis yet.
                                Create your first analysis to start
                                tracking your farm's soil condition.
                            </p>

                            <div className="mt-6">
                                <Button
                                    onClick={() =>
                                        navigate("/soil-analysis")
                                    }
                                >
                                    Create Soil Analysis
                                </Button>
                            </div>

                        </div>

                    </Card>
                )}

                {/* Records */}
                {!loading && soilRecords.length > 0 && (

                    <div className="space-y-6">

                        {soilRecords.map((record) => (

                            <Card key={record._id}>

                                {/* Record Header */}
                                <div className="mb-6 flex flex-col justify-between gap-3 border-b border-gray-200 pb-5 md:flex-row md:items-center">

                                    <div>

                                        <h2 className="text-xl font-semibold text-gray-900">

                                            {record.farm?.farmName ||
                                                "Farm"}

                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">

                                            {record.farm?.location ||
                                                "Location unavailable"}

                                        </p>

                                    </div>

                                    <p className="text-sm text-gray-500">

                                        {formatDate(record.createdAt)}

                                    </p>

                                </div>

                                 {/* Parameters */}
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                    {/* Nitrogen */}
                                    <div className="rounded-xl bg-green-50 p-4">

                                        <p className="text-sm text-gray-600">
                                            Nitrogen
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-green-800">
                                            {record.nitrogen}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            kg/ha
                                        </p>

                                    </div>


                                    {/* Phosphorus */}
                                    <div className="rounded-xl bg-blue-50 p-4">

                                        <p className="text-sm text-gray-600">
                                            Phosphorus
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-blue-800">
                                            {record.phosphorus}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            kg/ha
                                        </p>

                                    </div>


                                    {/* Potassium */}
                                    <div className="rounded-xl bg-purple-50 p-4">

                                        <p className="text-sm text-gray-600">
                                            Potassium
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-purple-800">
                                            {record.potassium}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            kg/ha
                                        </p>

                                    </div>


                                    {/* pH */}
                                    <div className="rounded-xl bg-amber-50 p-4">

                                        <p className="text-sm text-gray-600">
                                            Soil pH
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-amber-800">
                                            {record.ph}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            pH scale
                                        </p>

                                    </div>

                                </div>


                                {/* Environmental parameters */}
                                <div className="mt-4 grid gap-4 sm:grid-cols-3">

                                    <div className="rounded-xl border border-gray-200 p-4">

                                        <p className="text-sm text-gray-500">
                                            Soil Moisture
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {record.moisture}%
                                        </p>

                                    </div>


                                    <div className="rounded-xl border border-gray-200 p-4">

                                        <p className="text-sm text-gray-500">
                                            Temperature
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {record.temperature}°C
                                        </p>

                                    </div>


                                    <div className="rounded-xl border border-gray-200 p-4">

                                        <p className="text-sm text-gray-500">
                                            Humidity
                                        </p>

                                        <p className="mt-1 text-lg font-semibold text-gray-900">
                                            {record.humidity}%
                                        </p>

                                    </div>

                                </div>

                            </Card>

                        ))}
            </div>
                )}
            
        </div>
    </div>
    );
}

export default SoilHistory;