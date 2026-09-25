const express = require("express");

const {
    analyzeIrrigation,
    getIrrigationHistory,
} = require(
    "../controllers/irrigationController"
);

const {
    protect,
} = require(
    "../middlewares/authMiddleware"
);


const router = express.Router();


router.use(protect);


router.post(
    "/analyze",
    analyzeIrrigation
);


router.get(
    "/history",
    getIrrigationHistory
);


module.exports = router;