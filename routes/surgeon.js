const express = require("express");
const router = express.Router();
const Surgeon = require("../models/surgeon");

// GET all surgeons
router.get("/get-surgeons", async (req, res) => {
  try {
    const surgeons = await Surgeon.find().sort({ name: 1 });
    res.json(surgeons.map((s) => s.name));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch surgeons" });
  }
});

// POST new surgeon
router.post("/add-surgeon", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const existing = await Surgeon.findOne({ name });
    if (existing)
      return res.status(400).json({ error: "Surgeon already exists" });

    const newSurgeon = new Surgeon({ name });
    await newSurgeon.save();
    res.json({ message: "Surgeon added", surgeon: newSurgeon.name });
  } catch (err) {
    res.status(500).json({ error: "Failed to add surgeon" });
  }
});

module.exports = router;
