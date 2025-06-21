// controllers/videoController.js
const Video = require("../models/Video");
const fs = require("fs");
const path = require("path");


exports.uploadVideo = async (req, res) => {
  // console.log('💡 Upload route hit');
  try {
    const { title } = req.body;
    const fileUrl = `/uploads/videos/${req.file.filename}`;
    const user = req.user; // comes from auth middleware

    const newVideo = new Video({
      title,
      fileUrl,
      uploadedBy: user.userId,
      districtId: user.districtId
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded", video: newVideo });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

exports.getVideosByJournalist = async (req, res) => {
  // console.log(req.params)
  try {
    const userId = req.params.userId;
    const videos = await Video.find({ uploadedBy: userId }).populate("uploadedBy", "name").populate("districtId", "name");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};


exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const filePath = path.join(__dirname, "..", video.fileUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error("File deletion failed:", err);
    });

    await video.deleteOne();
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete video", error: err.message });
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const filePath = path.join(__dirname, "..", video.fileUrl);
    res.download(filePath); // Triggers file download
  } catch (err) {
    res.status(500).json({ message: "Failed to download video", error: err.message });
  }
};

exports.getVideosByDistrict = async (req, res) => {
  try {
    const districtId = req.params.districtId;

    const videos = await Video.find({ districtId })
      .populate("uploadedBy", "name")
      .populate("districtId", "name");

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};
