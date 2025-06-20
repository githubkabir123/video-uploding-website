// models/District.js
const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("District", districtSchema);
