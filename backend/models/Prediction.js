const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
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
        N : {
            type : Number,
            required : true,
        },
        P : {
            type : Number,
            required : true,
        },
        K : {
            type : Number ,
            required : true,
        },
        temperature : {
            type : Number ,
            required : true,
        },
        humidity : {
            type : Number,
            required : true,
        },
        ph : {
            type : Number,
            required : true,
        },
        rainfall : {
            type : Number ,
            required : true
        },
    },

    predictedCrop : {
        type : String,
        required : true,
    },

    confidence : {
        type : Number ,
        required : true,
        min : 0,
        max : 1,
    },
    topPredictions : [
        {
            crop : {
                type : String,
                required : true,
            },
            probability : {
                type : Number,
                required : true,
                min : 0,
                max : 1,
            },
        },
    ],
},
{
    timestamps : true, 
}
)

module.exports = mongoose.model("Prediction" , predictionSchema);