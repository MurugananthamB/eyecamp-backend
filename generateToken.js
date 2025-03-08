const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load JWT_SECRET from .env

const secret = process.env.JWT_SECRET; // Ensure .env file has a valid JWT_SECRET

const user = {
  id: "Admin",
  email: "techsupport@mapims.edu.in",
};

// ✅ Generate JWT token
const token = jwt.sign(user, secret, { expiresIn: "1h" });

console.log("✅ JWT Token Generated:");
console.log(token);
