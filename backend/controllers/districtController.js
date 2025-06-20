// controllers/districtController.js
const District = require("../models/District");

exports.createDistrict = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await District.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "District already exists." });
    }

    const newDistrict = new District({ name });
    await newDistrict.save();

    res.status(201).json({ message: "District created", district: newDistrict });
  } catch (err) {
    res.status(500).json({ message: "Failed to create district", error: err.message });
  }
};

exports.getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find().sort("name");
    res.json(districts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch districts", error: err.message });
  }
};

exports.updateDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await District.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "District not found" });
    }

    res.json({ message: "District updated", district: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update district", error: err.message });
  }
};

exports.deleteDistrict = async (req, res) => {
  try {
    const deleted = await District.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "District not found" });
    }

    res.json({ message: "District deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete district", error: err.message });
  }
};


