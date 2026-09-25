const mongoose = require('mongoose');

const fertilizerRecommendationSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        farm : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Farm",
            required : true,
        },
        soilRecord : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SoilRecord",
            required : true,
        },
        inputs : {
            nitrogen : {
                type : Number,
                required : true,
            },
            phosphorus : {
                type : Number , 
                required : true,
            },
            potassium : {
                type : Number,
                required : true,
            },
            ph : {
                type : Number,
                required : true,
            },
        },

        nutrientStatus : {
            nitrogen : {
                type : String,
                required : true,
            },
            phosphorus : {
                type : String,
                required : true,
            },
            potassium : {
                type : String,
                required : true,
            },
        },

        guidance : [
            {
                type : String,
            },
        ],
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("FertilizerRecommendation" , fertilizerRecommendationSchema);