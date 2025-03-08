const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Identifier for the counter (e.g., "patientRegNo")
  sequence_value: { type: Number, default: 0 }, // Last used Reg No
});

module.exports = mongoose.model("Counter", counterSchema);
