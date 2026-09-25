import { useEffect , useState } from "react";
import { createFarm , deleteFarm , getFarms } from "../services/farmService";

function Farms(){
    const [farms , setFarms] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error ,  setError] = useState("");

    const [showForm ,  setShowForm] = useState(false);
    const [formData , setFormData] = useState({
        farmName : "",
        area : "",
        areaUnit : "acre",
        location : "",
        soilType : "Black Soil",
        irrigationSource : "Canal",
        currentCrop : "",
        previousCrop : "",
    });

    // ==============================
    // LOAD FARMS
    // ==============================
    const loadFarms = async ()=>{
        try{
            setLoading(true);
            setError("");

            const data = await getFarms();

            setFarms(data.farms);
        }catch(error){
            setError(
                error.response?.data?.message || "Failed to load farms"
            );
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        loadFarms();
    },[]);

    // ===========================
    // INPUT CHANGE
    // ===========================
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    // ========================
    // CREATE FARM
    // ========================
    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            setError("");

            await createFarm({
                ...formData,
                area : Number(formData.area),
            });

            setFormData({
                farmName: "",
                area: "",
                areaUnit: "acre",
                location: "",
                soilType:"Black Soil",
                irrigationSource: "Canal",
                currentCrop: "",
                previousCrop: "",
            });

            setShowForm(false);

            await loadFarms();

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to create farm"
            );
        }
    };

    // ======================
    // DELETE FARM
    // ======================
    const handleDelete = async (id)=>{
        const confirmed = window.confirm(
            "Are you sure you want to delete this farm?"
        );

        if(!confirmed){
            return;
        }

        try {
            await deleteFarm(id);

            await loadFarms();
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to delete Farm"
            );
        }
    };

    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className=" mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Farms
                        </h1>
                        <p className="mt-1 text-gray-600">
                            Manage your farms and agricultural information.
                        </p>
                    </div>
                    <button 
                        onClick={()=>setShowForm(!showForm)}
                        className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
                    >
                        {showForm ? "close" : "+ Add farm"}
                    </button>
                </div>

                {/* Error */}

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {/* Create Farm Form */}

                {showForm && (
                    <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-gray-900">
                            Add New Farm
                        </h2>

                        <form 
                            onSubmit={handleSubmit}
                            className="grid gap-5 md:grid-cols-2"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Farm Name
                                </label>

                                <input 
                                    name="farmName"
                                    value={formData.farmName}
                                    onChange={handleChange}
                                    placeholder="Main Farm"
                                    required
                                    className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Area
                                </label>
                                <input
                                    name="area"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={formData.area}
                                    onChange={handleChange}
                                    placeholder="5"
                                    required
                                    className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Area Unit
                                </label>
                                <select
                                    name="areaUnit"
                                    value={formData.areaUnit}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5"
                                    required
                                >
                                    <option value="acre">
                                        Acre
                                    </option>

                                    <option value="hectare">
                                        Hectare
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Location
                                </label>

                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Chhatrapati Sambhajinagar"
                                    required
                                    className="w-full rounded-lg border px-4 py-2.5 outline-none focus:border-green-600"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Soil Type
                                </label>

                                <select
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5"
                                    required
                                >
                                    <option>
                                        Black Soil
                                    </option>

                                    <option>
                                        Red Soil
                                    </option>

                                    <option>
                                        Alluvial Soil
                                    </option>

                                    <option>
                                        Laterite Soil
                                    </option>

                                    <option>
                                        Sandy Soil
                                    </option>

                                    <option>
                                        Loamy Soil
                                    </option>

                                    <option>
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Irrigation Source
                                </label>

                                <select
                                    name="irrigationSource"
                                    value={formData.irrigationSource}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5"
                                    required
                                >
                                    <option>Canal</option>
                                    <option>Well</option>
                                    <option>Borewell</option>
                                    <option>Rainfall</option>
                                    <option>River</option>
                                    <option>Drip</option>
                                    <option>Sprinkler</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Current Crop
                                </label>

                                <input
                                    name="currentCrop"
                                    value={formData.currentCrop}
                                    onChange={handleChange}
                                    placeholder="Sugarcane"
                                    className="w-full rounded-lg border px-4 py-2.5"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Previous Crop
                                </label>

                                <input
                                    name="previousCrop"
                                    value={formData.previousCrop}
                                    onChange={handleChange}
                                    placeholder="Soybean"
                                    className="w-full rounded-lg border px-4 py-2.5"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-green-700 px-6 py-2.5 font-medium text-white hover:bg-green-800"
                                >
                                    Save Farm
                                </button>
                            </div>
                            
                        </form>
                    </div>
                )}

                {/* Loading */}

                {loading && (
                    <div className="rounded-2xl border bg-white p-10 text-center">
                        <p className="text-gray-600">
                            Loading farms...
                        </p>
                    </div>
                )}

                 {/* Empty State */}

                {!loading && farms.length === 0 && (
                    <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

                        <div className="text-5xl">
                            🌱
                        </div>

                        <h2 className="mt-4 text-xl font-bold">
                            No farms added yet
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Add your first farm to start using
                            AgriSmart AI.
                        </p>

                    </div>
                )}

                {/* Farm Cards */}

                {!loading && farms.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {farms.map((farm) => (
                            <div
                                key={farm._id}
                                className="rounded-2xl border bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-start justify-between">

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {farm.farmName}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {farm.location}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        {farm.area} {farm.areaUnit}
                                    </span>

                                </div>


                                <div className="mt-6 space-y-3 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Soil
                                        </span>

                                        <span className="font-medium">
                                            {farm.soilType}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Irrigation
                                        </span>

                                        <span className="font-medium">
                                            {farm.irrigationSource}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">
                                            Current Crop
                                        </span>

                                        <span className="font-medium">
                                            {farm.currentCrop || "Not specified"}
                                        </span>
                                    </div>

                                </div>


                                <div className="mt-6 flex gap-3">


                                    <button
                                        onClick={() =>
                                            handleDelete(farm._id)
                                        }
                                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:cursor-pointer"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Farms;