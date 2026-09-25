const express = require("express")

const {healthCheck , testPost } = require("../controllers/testController");

const router = express.Router();

router.get("/health" , healthCheck);
router.post("/data" , testPost)

module.exports = router;