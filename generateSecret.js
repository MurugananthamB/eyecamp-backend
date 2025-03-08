const crypto = require("crypto");
const fs = require("fs");

// Generate a random 64-byte secret key
const jwtSecret = crypto.randomBytes(64).toString("hex");

// Save it to the .env file
fs.writeFileSync(".env", `JWT_SECRET=${jwtSecret}\n`);

console.log("✅ JWT Secret Key Generated & Saved to .env");
console.log("🔑 Secret Key:", jwtSecret);
