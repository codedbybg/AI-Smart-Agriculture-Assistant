const express = require("express");
const  { createSoilRecord , getSoilRecords , getFarmSoilRecords , getSoilRecordById , } = require("../controllers/soilController");

const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

// All soil routes required authentication
router.use(protect);

// Create soil analysis
router.post("/" , createSoilRecord);

// Get all soil records
router.get("/" , getSoilRecords);

// Get soil records for particular farm
router.get("/farm/:farmId" , getFarmSoilRecords);

// Get single soil records
router.get("/:id" , getSoilRecordById);

module.exports = router;