const express = require("express");

const {
    analyzeFertilizer,
    getFertilizerHistory,
} = require(
    "../controllers/fertilizerController"
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
    analyzeFertilizer
);


router.get(
    "/history",
    getFertilizerHistory
);


module.exports = router;