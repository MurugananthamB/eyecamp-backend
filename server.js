require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Import DB connection
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes"); // Import patient routes
const https = require("https");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // Ensure JSON parsing

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes); // Patient-related routes

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Welcome to APH EYE CAMP API");
});

// ✅ Handle 404 (Undefined Routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Keep Server Awake (Only for free-tier Render)
const SERVER_URL = process.env.SERVER_URL || ""; // Fallback to prevent undefined errors
if (SERVER_URL) {
  setInterval(() => {
    https
      .get(SERVER_URL, (res) => {
        console.log(`🔄 Keep-alive request sent. Status: ${res.statusCode}`);
      })
      .on("error", (err) => {
        console.error("⚠️ Keep-alive request failed:", err.message);
      });
  }, 2 * 60 * 1000); // Every 2 minutes
}

// ✅ Start Server
const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`));
