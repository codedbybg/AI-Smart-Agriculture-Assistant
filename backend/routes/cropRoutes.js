const express = require("express");

const {
    predictCrop,
    getPredictionHistory,
} = require("../controllers/cropController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


// All crop routes require authentication
router.use(protect);


// Generate crop prediction
router.post("/predict", predictCrop);


// Get prediction history
router.get("/history", getPredictionHistory);


module.exports = router;