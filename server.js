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

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes); // Patient-related routes

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Welcome to APH EYE CAMP API");
});

// API to check if regNo exists
app.get("/checkRegNo/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;
    const existingPatient = await Patient.findOne({ regNo });

    if (existingPatient) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking regNo:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Keep Server Awake (Only for free-tier Render)
const SERVER_URL = process.env.SERVER_URL; // Get from environment
if (SERVER_URL) {
  setInterval(() => {
    https
      .get(SERVER_URL, (res) => {
        console.log(`🔄 Keep-alive request sent. Status: ${res.statusCode}`);
      })
      .on("error", (err) => {
        console.error("⚠️ Keep-alive request failed:", err.message);
      });
  }, 30 * 60 * 1000); // Every 5 minutes
}

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
