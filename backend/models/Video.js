// models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true }, // file path or URL
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Video", videoSchema);
