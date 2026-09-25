const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        farmName : {
            type : String,
            required : [true , "Farm name is required"],
            trim : true,
            minlength : 2,
            max_length : 100,
        },
        area : {
            type : Number,
            required : [true , "Farm area is required"],
            min : [0.01 , "Farm area must be greater than 0"],
        },
        areaUnit : {
            type : String,
            required: [true, "Area unit is required"],
            enum : { values: ["acre", "hectare"], message: "Area unit must be acre or hectare", },
            default : "acre",
        },
        location : {
            type : String,
            required : [true , "Farm location is required"],
            trim : true,
        },
        soilType : {
            type : String,
            required: [true, "Soil type is required"],
            enum : [
                "Black Soil",
                "Red Soil",
                "Alluvial Soil",
                "Laterite Soil",
                "Sandy Soil",
                "Loamy Soil",
                "Other",
            ],
            default : "Other",
        },
        irrigationSource : {
            type : String,
            required: [true, "Irrigation source is required"],
            enum : [
                "Canal",
                "Well",
                "Borewell",
                "Rainfall",
                "River",
                "Drip",
                "Sprinkler",
                "Other",
            ],
            default : "Other",
        },
        currentCrop : {
            type : String,
            required: [true, "Current crop is required"],
            trim : true,
            default : "",
        },
        previousCrop : {
            type : String,
            required: [true, "Previous crop is required"],
            trim : true,
            default : "",
        },
    },
    {
        timestamps : true,
    }
);

const Farm = mongoose.model("Farm" , farmSchema);

module.exports = Farm;