const express = require("express");

const { createFarm , getFarms , getFarmById , updateFarm , deleteFarm ,} = require("../controllers/farmController");
const { protect ,} = require("../middlewares/authMiddleware");

const router = express.Router();

// All farms routes require authentication
router.use(protect);

// create farm
router.post("/" , createFarm);

// get all farms
router.get("/" , getFarms);

// get single farm
router.get("/:id" , getFarmById);

// Update farm
router.put("/:id" , updateFarm);

// delete farm
router.delete("/:id" , deleteFarm);

module.exports = router;