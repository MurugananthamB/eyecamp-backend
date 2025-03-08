const express = require("express");
const router = express.Router();
const { submitPatientData } = require("../controllers/patientController");

// POST /pts-dts - Submit patient data
router.post("/", submitPatientData);

module.exports = router;
