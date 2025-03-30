const mongoose = require("mongoose");

const surgeonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Surgeon", surgeonSchema);
