const mongoose = require("mongoose");

const soilRecordSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        farm : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Farm" , 
            required : true,
        },
        nitrogen : {
            type : Number,
            required : [true , "Nitrogen value is required"],
            min : [0 , "Nitrogen cannot be negative"],  
        },
        phosphorus : {
            type : Number,
            required : [true , "Phosphorus value is required"],
            min : [0, "Phosphorus cannot be negative"],
        },
        potassium : {
            type : Number , 
            required : [true , "Potassium value is required"],
            min : [0 , "Potassium value can't be negative"],
        },
        ph : {
            type : Number,
            required : [true , "pH value is required"],
            min : [0 , "pH cannot be negative"],
            max : [14 , "pH cannot be greater than 14"],
        },
        moisture : {
            type : Number,
            required : [true , "Moisture value is required"],
            min : [0 , "Moisture cannot be negative"],
            max : [100 , "Moisture cannot be greater than 100"],
        },
        temperature : {
            type : Number , 
            required : [true , "Temperature is required"],
        },
        humidity : {
            type : Number , 
            required : [true , "Humidity is required"],
            min : [0 , "Humidity cannot be negative"],
            max : [100 , "Humidity cannot be greater than 100"],
        },
    },
    {
        timestamps : true,
    }
);

const SoilRecord = mongoose.model("SoilRecord" , soilRecordSchema);

module.exports = SoilRecord;