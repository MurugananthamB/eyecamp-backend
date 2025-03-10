const express = require("express");
const router = express.Router();
const {
  submitPatientData,
  getAllPatients,
  getPatientDetails,
} = require("../controllers/patientController");

// POST /pts-dts - Submit patient data
router.post("/", submitPatientData);

// GET /api/patients - Get all patient data
router.get("/", getAllPatients);

// GET /api/patients/:patientId - Get patient details by ID
router.get("/:regNo", getPatientDetails);

module.exports = router;
