const SoilRecord = require("../models/SoilRecord");
const Farm = require("../models/Farm");

// Create soil analysis
const createSoilRecord = async (req , res , next)=>{
    try {
        const {farmId , nitrogen , phosphorus , potassium , ph , moisture , temperature , humidity , } = req.body;

        // Basic validation
        if (
            !farmId || nitrogen === undefined ||
            phosphorus === undefined ||
            potassium === undefined ||
            ph === undefined ||
            moisture === undefined ||
            temperature === undefined ||
            humidity === undefined
        ){
            res.status(400);
            throw new Error("Farm and all soil parameter's are required");
        }

        // Check whether farm belongs to logged in user or not
        const farm = await Farm.findOne({
            _id : farmId,
            user : req.user._id,
        });

        if(!farm){
            res.status(404);
            throw new Error("Farm not found or you do not have access to this farm");
        }

        // Create soil record
        const soilRecord = await SoilRecord.create({
            user : req.user._id,
            farm : farmId,
            nitrogen,
            phosphorus,
            potassium,
            ph,
            moisture,
            temperature,
            humidity,
        });

        res.status(201).json({
            success : true,
            message : "Soil Analysis saved successfully",
            soilRecord
        });
    } catch (error) {
        next(error);
    }
};

// Get all soil record to logged in user
const getSoilRecords = async (req , res , next )=>{
    try {
        const soilRecords = await SoilRecord.find({
            user : req.user._id
        }).populate("farm" , "farmName location")
        .sort({createdAt : -1});

        res.status(200).json({
            success : true,
            count : soilRecords.length,
            soilRecords,
        });
    } catch (error) {
        next(error);
    }
};

// Get soil records for a particular farm
const getFarmSoilRecords = async (req , res , next)=>{
    try{
        const {farmId} = req.params;

        // check farm ownership
        const farm = await Farm.findOne({
            _id : farmId,
            user : req.user._id,
        });

        if(!farm){
            res.status(400);
            throw new Error("Farm not found or you do not have access to this farm");
        }

        const soilRecords = await SoilRecord.find({
            farm : farmId,
            user : req.user._id,
        }).sort({createdAt : -1});

        res.status(200).json({
            success : true,
            count : soilRecords.length,
            soilRecords
        });
    }catch(error){
        next(error);
    }
};

// Get single soil record
const getSoilRecordById = async (req , res , next)=>{
    try{
        const {id} = req.params;
        const soilRecord = await SoilRecord.findOne({
            _id : id,
            user : req.user._id,
        }).populate("farm" , "farmName location");

        if(!soilRecord){
            res.status(404);
            throw new Error("Soil record not found")
        }

        res.status(200).json({
            success : true,
            soilRecord,
        });

    }catch(error){
        next(error);
    }
};

module.exports = {
    createSoilRecord,
    getSoilRecords,
    getFarmSoilRecords,
    getSoilRecordById,
};