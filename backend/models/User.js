const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true , "Name is required"],
            trim : true,
            minlength : 2,
            max_length : 50
        },
        email : {
            type : String,
            required : [true , "Email is required"],
            unique : true,
            lowercase : true,
            trim : true,
        },
        password : {
            type : String,
            required :[true, "Password is required"],
            minlength : 6,
        },
        role : {
            type : String,
            enum : ["farmer" , "admin"],
            default : "farmer",
        },
    },
    {
        timestamps : true,
    }
);

const User = mongoose.model("User" , userSchema);

module.exports = User;