const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  updateUserName, // ✅ Import the function
  resetUserPassword, // ✅ Import the function
  updateUserStatus, // ✅ Import the function
} = require("../controllers/userController");

const router = express.Router(); // ✅ Define Router

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers); // ✅ Ensure this route exists
router.put("/:id", updateUserName); // Update Name
router.put("/:id/reset-password", resetUserPassword); // Reset Password
router.put("/:id/status", updateUserStatus); // Change User Status


module.exports = router; // ✅ Export Router
