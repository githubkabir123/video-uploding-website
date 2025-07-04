// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["journalist", "editor", "admin"], default: "journalist" },
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: "District" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
