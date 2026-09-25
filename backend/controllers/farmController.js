const Farm = require("../models/Farm");
const SoilRecord = require("../models/SoilRecord");
const Prediction = require("../models/Prediction");
const WeatherRecord = require("../models/WeatherRecord");


// ===========================
// CREATE FARM
// ===========================

const createFarm = async (req , res , next)=>{
    try{
        const {
            farmName,
            area,
            areaUnit,
            location,
            soilType,
            irrigationSource,
            currentCrop,
            previousCrop,
        } = req.body;

        if(!farmName || !area || !location){
            res.status(400);
            throw new Error("Farm name , area and location are required");
        }

        // --------------------------------------------  
        // Required field validation // 
        // --------------------------------------------

        if (
            !farmName || !String(farmName).trim() || area === undefined || 
            area === null || area === "" || !areaUnit || !location || 
            !String(location).trim() || !soilType || !irrigationSource || 
            !currentCrop || !String(currentCrop).trim() || !previousCrop || 
            !String(previousCrop).trim() 
        ) { res.status(400); throw new Error("All farm fields are required"); }

        // const areaValue = Number(area); if (!Number.isFinite(areaValue) || areaValue <= 0) { res.status(400); throw new Error("Farm area must be a valid number greater than 0"); } // -------------------------------------------- // String length validation // -------------------------------------------- if (String(farmName).trim().length < 2) { res.status(400); throw new Error("Farm name must be at least 2 characters"); } if (String(location).trim().length < 2) { res.status(400); throw new Error("Location must be at least 2 characters"); } if (String(currentCrop).trim().length < 2) { res.status(400); throw new Error("Current crop must be at least 2 characters"); } if (String(previousCrop).trim().length < 2) { res.status(400); throw new Error("Previous crop must be at least 2 characters"); }

        const farm = await Farm.create({
            user : req.user._id,
            farmName,
            area,
            areaUnit,
            location,
            soilType,
            irrigationSource,
            currentCrop,
            previousCrop,
        });

        res.status(201).json({
            success : true,
            message : "Farm Created Successfully",
            farm,
        });

    }catch(error){
        next(error);
    }
};

// ===================================
// GET ALL FARMS OF LOGGED-IN USER
// ===================================
const getFarms = async (req , res ,  next)=>{
    try {
        const farms = await Farm.find({
            user : req.user._id,
        }).sort({createdAt : -1 });

        res.status(200).json({
            success : true,
            count : farms.length,
            farms,
        });
    } catch (error) {
        next(error);   
    }
};

// =============================
// GET SINGLE FARM 
// =============================
const getFarmById = async (req , res , next)=>{
    try {
        const farm = await Farm.findOne({
            _id : req.params.id,
            user : req.user._id,
        });

        if(!farm){
            res.status(404);
            throw new Error("Farm not found");
        }

        res.status(200).json({
            success : true,
            farm,
        });
    } catch (error) {
        next(error);
    }
};

// =========================
// UPDATE FARM
// =========================
const updateFarm = async (req , res , next)=>{
    try {
        const farm = await Farm.findOne({
            _id : req.params._id,
            user : req.user._id,
        })

        if(!farm){
            res.status(404);
            throw new Error("Farm not found");
        }

        const {
            farmName,
            area,
            areaUnit,
            location,
            soilType,
            irrigationSource,
            currentCrop,
            previousCrop,
        } = req.body;

        farm.farmName = farmName ?? farm.farmName;
        farm.area = area ?? farm.area;
        farm.areaUnit = areaUnit ?? farm.areaUnit;
        farm.location = location ?? farm.location;
        farm.soilType = soilType ?? farm.soilType;
        farm.irrigationSource = irrigationSource ?? farm.irrigationSource;
        farm.currentCrop = currentCrop ?? farm.currentCrop;
        farm.previousCrop = previousCrop ?? farm.previousCrop;

        const updatedFarm = await farm.save();

        res.status(200).json({
            success : true,
            message : "Farm updated successfully",
            farm : updatedFarm,
        })
    } catch (error) {
        next(error);
    }
};

// =========================
// DELETE FARM
// =========================
const deleteFarm = async (req , res , next)=>{
    try {

        // =======================
        // Authentication check
        // =======================
        if(!req.user || !req.user._id){
            res.status(401);
            throw new Error("Authentication required");
        }

        // =======================================
        // Find farm belonging to logged-in user
        // ========================================
        const farm = await Farm.findOne({
            _id : req.params.id,
            user : req.user._id,
        });

        if(!farm){
            res.status(404);
            throw new Error("Farm not found");
        }

        // =====================================
        // Delete all soil records of this farm
        // ======================================
        await SoilRecord.deleteMany({
            farm : farm._id,
            user : req.user._id,
        });

        // =======================================
        // Delete all AI prediction of this farm
        // =======================================
        await Prediction.deleteMany({
            farm : farm._id,
            user : req.user._id,
        });

        // ========================================
        // Delete all weather records of this farm
        // ========================================
        await WeatherRecord.deleteMany({
            farm : farm._id,
            user : req.user._id,
        })

        // ================================
        // Finally Delete Farm
        // ================================
        await Farm.deleteOne({
            _id : farm._id,
            user : req.user._id,
        });

        // ========================
        // Success Message
        // ========================

        res.status(200).json({
            success : true,
            message : "Farm deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFarm,
    getFarms,
    getFarmById,
    updateFarm,
    deleteFarm,
}