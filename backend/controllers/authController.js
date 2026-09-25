const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken')

// -------------------------
// REGISTER USER
// -------------------------
const registerUser = async (req , res , next)=>{
    try{
        const {name , email , password } = req.body;

        // Basic validation
        if(!name || !email || !password){
            res.status(400);
            throw new Error("Name , Email and password are required");
        }

        // check password length
        if (password.length < 6){
            res.status(400);
            throw new Error("Password must be at least 6 characters")
        }

        const normalizedEmail = email.toLowerCase().trim();

        // check if user already exists
        const existingUser = await User.findOne({
            email : normalizedEmail,
        });

        if(existingUser){
            res.status(409);
            throw new Error("User with this email is already exists!");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        // Create USer
        const user = await User.create({
            name : name.trim(),
            email : normalizedEmail,
            password : hashedPassword,
            role : "farmer",
        });

        // Generate Token
        const token = generateToken(user._id);

        res.status(201).json({
            success : true,
            message : "User registered successfully!",
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
            },
        });
    }catch(error){
        next(error);
    }
};

// ================================
// LOGIN USER
// ================================

const loginUser = async (req , res , next)=>{
    try{
        const {email , password } = req.body;

        // validation
        if (!email || !password){
            res.status(400);
            throw new Error("Email and password are required");
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Find User
        const user = await User.findOne({
            email : normalizedEmail,
        });

        if (!user){
            res.status(401);
            throw new Error("Invalid Email or password");
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password , 
            user.password
        );

        if (!passwordMatch){
            res.status(401);
            throw new Error("Invalid password or email");
        }

        // Generate JWT
        const token = generateToken(user._id);

        res.status(200).json({
            success : true,
            message : "Login Successful",
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
            },
        });

    }catch(error){
        next(error);
    }
}

const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        },
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
}