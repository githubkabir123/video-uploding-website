// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Upload video (journalists only)
router.post("/upload", authMiddleware, upload.single("video"), videoController.uploadVideo);

// Get videos by journalist
router.get("/journalist/:userId", authMiddleware, videoController.getVideosByJournalist);

// Delete video (editor/admin only)
router.delete("/:id", authMiddleware, roleMiddleware("editor", "admin"), videoController.deleteVideo);

// Download video (any logged-in user)
router.get("/download/:id", authMiddleware, videoController.downloadVideo);

// Get all videos by a specific district
router.get("/district/:districtId", authMiddleware, roleMiddleware("editor", "admin"), videoController.getVideosByDistrict);


module.exports = router;
