const express = require("express");
const router = express.Router();
const {
  submitPatientData,
  getAllPatients,
  getPatientDetails,
  checkRegNo, // ✅ Ensure this function is implemented in patientController.js
} = require("../controllers/patientController");

// ✅ POST /api/patients - Submit patient data
router.post("/", submitPatientData);

// ✅ GET /api/patients - Get all patient data
router.get("/", getAllPatients);

// ✅ GET /api/patients/checkRegNo/:regNo - Check if a regNo exists
router.get("/checkRegNo/:regNo", checkRegNo);

// ✅ GET /api/patients/:regNo - Get patient details by regNo
router.get("/:regNo", getPatientDetails);

module.exports = router;
