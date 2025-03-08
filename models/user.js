const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true }, // Employee ID should be unique
  password: { type: String, required: true },
  // Remove the email field completely
});

const User = mongoose.model("User", userSchema);
module.exports = User;
