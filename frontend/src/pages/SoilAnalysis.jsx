import { useEffect , useState } from "react";
import {useNavigate} from 'react-router-dom';

import Card from "../components/Card";
import Button from "../components/Button";

import {getFarms} from "../services/farmService";
import { createSoilRecord } from "../services/soilService";

function SoilAnalysis(){
    const navigate = useNavigate();

    const [farms , setFarms ] = useState([]);

    const [ loadingFarms , setLoadingFarms ] = useState(true);
    const [ submitting , setSubmitting ] = useState(false);

    const [ error , setError ] = useState("");
    const [ success , setSuccess ] = useState("");

    const [formData , setFormData ] = useState({
        farmId : "",
        nitrogen : "",
        phosphorus : "",
        potassium : "",
        ph : "",
        moisture : "",
        temperature : "",
        humidity : "",
    });

    // Load user's farms
    useEffect(()=>{
        const loadFarms = async ()=>{
            try {
                setLoadingFarms(true);
                setError("");

                const data = await getFarms();

                setFarms(data.farms || []);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message || "Failed to load farms"
                );
            }finally{
                setLoadingFarms(false);
            }
        };

        loadFarms();
    } , []);

    // Handle input changes
    const handleChange = (e)=>{
        const { name , value } = e.target;

        setFormData((previousData)=>({
            ...previousData,
            [name] : value,
        }));
    };

    // Submit soil analysis
    const handleSubmit = async (e)=>{
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            setSubmitting(true);

            const soilData = {
                farmId : formData.farmId,

                nitrogen: Number(formData.nitrogen),
                phosphorus: Number(formData.phosphorus),
                potassium: Number(formData.potassium),

                ph: Number(formData.ph),
                moisture: Number(formData.moisture),
                temperature: Number(formData.temperature),
                humidity: Number(formData.humidity),
            };

            await createSoilRecord(soilData);

            setSuccess("Soil analysis saved successfully");

            // Reset form values
            setFormData({
                farmId : "",
                nitrogen : "",
                phosphorus : "",
                potassium : "",
                ph : "",
                moisture : "",
                temperature : "",
                humidity : "",

            });
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message || "Failed to save soil analysis"
            );
        }finally{
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">

                    <button
                        onClick={()=>navigate("/dashboard")}
                        className="mb-4 text-sm font-medium text-green-700 hover:text-green-800"
                    >
                        ← Back to Dashboard
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Soil Analysis
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Enter your farm's soil parameters
                        to save an analysis record
                    </p>

                </div>

                {/* Error */}

                {
                    error && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                            {error}
                        </div>
                    )
                }

                {/* Success */}
                {
                    success && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
                            {success}
                        </div>
                    )
                }

                <Card>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        {/* Farm Selection */}
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Select Farm
                            </h2>

                            {loadingFarms ? (
                                    <p className="text-gray-500">
                                        Loading farms...
                                    </p>
                                ) : farms.length === 0 ? (
                                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                        
                                        <p className="text-amber-800">
                                            you don't have any farms yet.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={()=>navigate("/farms")}
                                            className="mt-2 font-medium text-green-700 hover:underline"
                                        >
                                            Add a farm first →
                                        </button>
                                    </div>
                                ) : (
                                    <select 
                                        name="farmId"
                                        value={formData.farmId}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    >
                                        <option value="">
                                            Select your farm
                                        </option>

                                        {
                                            farms.map((farm)=>(
                                                <option 
                                                    key={farm._id}
                                                    value={farm._id}
                                                >
                                                    {farm.farmName}{""}
                                                    {farm.area}{""}
                                                    {farm.areaUnit}
                                                </option>
                                            ))
                                        }
                                    </select>
                                )}
                        </div>

                        {/* Nutrients */}

                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Soil Nutrients
                            </h2>

                            <div className="grid gap-5 md:grid-cols-3">

                                {/* Nitrogen */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nitrogen (N)
                                    </label>

                                    <input
                                        type="number"
                                        name="nitrogen"
                                        value={formData.nitrogen}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        required
                                        placeholder="e.g. 90"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        kg/ha
                                    </p>
                                </div>

                                {/* Phosphorus */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Phosphorus (P)
                                    </label>
                                    <input
                                        type="number"
                                        name="phosphorus"
                                        value={formData.phosphorus}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        required
                                        placeholder="e.g. 42"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        kg/ha
                                    </p>
                                </div>

                                {/* Potassium */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Potassium (K)
                                    </label>

                                    <input
                                        type="number"
                                        name="potassium"
                                        value={formData.potassium}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        required
                                        placeholder="e.g. 43"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        kg/ha
                                    </p>
                                </div>
                            </div>
                        </div>     

                        {/* Soil Conditions */}
                        <div>

                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                Soil Conditions
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* pH */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Soil pH
                                    </label>

                                    <input
                                        type="number"
                                        name="ph"
                                        value={formData.ph}
                                        onChange={handleChange}
                                        min="0"
                                        max="14"
                                        step="0.1"
                                        required
                                        placeholder="e.g. 6.5"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Range: 0–14
                                    </p>
                                </div>


                                {/* Moisture */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Soil Moisture
                                    </label>

                                    <input
                                        type="number"
                                        name="moisture"
                                        value={formData.moisture}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="any"
                                        required
                                        placeholder="e.g. 45"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Percentage (%)
                                    </p>
                                </div>


                                {/* Temperature */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Temperature
                                    </label>

                                    <input
                                        type="number"
                                        name="temperature"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        step="any"
                                        required
                                        placeholder="e.g. 25"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        °C
                                    </p>
                                </div>


                                {/* Humidity */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Humidity
                                    </label>

                                    <input
                                        type="number"
                                        name="humidity"
                                        value={formData.humidity}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="any"
                                        required
                                        placeholder="e.g. 70"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Percentage (%)
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Submit */}
                        <div className="border-t border-gray-200 pt-6">

                            <Button
                                type="submit"
                                disabled={
                                    submitting ||
                                    farms.length === 0
                                }
                            >
                                {submitting
                                    ? "Saving..."
                                    : "Save Soil Analysis"}
                            </Button>

                        </div>
                    </form>
                </Card>

            </div>
        </div>
    );
}

export default SoilAnalysis;