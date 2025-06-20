// routes/districtRoutes.js
const express = require("express");
const router = express.Router();
const districtController = require("../controllers/districtController");

// You may add auth middleware here if needed
router.post("/", districtController.createDistrict);        // Create new district
router.get("/", districtController.getAllDistricts);        // Get all districts
router.put("/:id", districtController.updateDistrict);      // Update district
router.delete("/:id", districtController.deleteDistrict);   // Delete district
module.exports = router;
