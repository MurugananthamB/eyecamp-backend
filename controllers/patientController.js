const Patient = require("../models/patientModel");

// Function to parse date strings into Date objects
const parseDate = (dateString) => {
  if (!dateString) return null;
  // Handle "2025-03-08 9:13:07 pm" format
  if (dateString.includes(" ")) {
    return new Date(dateString.replace(" ", "T") + "Z");
  }
  // Handle "2025-03-12T20:59" format
  if (dateString.length === 16) {
    return new Date(dateString + ":00.000Z");
  }
  // Handle "2025-03-04" format
  if (dateString.length === 10) {
    return new Date(dateString + "T00:00:00.000Z");
  }
  // Default to ISO 8601 parsing
  return new Date(dateString);
};

// Submit patient data
const submitPatientData = async (req, res) => {
  try {
    const {
      regNo,
      title,
      patientName,
      fatherOrCO,
      attenderName,
      attenderMobile,
      gender,
      age,
      mobile,
      address,
      district,
      otherDistrict,
      email,
      visualRight,
      visualLeft,
      ownGlasses,
      procedureName,
      surgeonName,
      dateOfDischarge,
      diagnosis,
      registrationDateTime,
      otDateTime,
      surgeryDate,
      surgeryPlace,
      operatedEye,
      followPlace,
      medication,
      finalDiagnosis,
      others,
      firstVisit,
      secondVisit,
      referredBy,
    } = req.body;

    // Parse all date fields
    const parsedOtDateTime = parseDate(otDateTime);
    const parsedFirstVisit = parseDate(firstVisit);
    const parsedSecondVisit = parseDate(secondVisit);

    // Validate parsed dates
    if (!parsedOtDateTime || isNaN(parsedOtDateTime.getTime())) {
      return res.status(400).json({ message: "Invalid otDateTime format." });
    }

    // Create a new patient record
    const newPatient = new Patient({
      regNo,
      title,
      patientName,
      fatherOrCO,
      attenderName,
      attenderMobile,
      gender,
      age,
      mobile,
      address,
      district,
      otherDistrict,
      email,
      visualRight,
      visualLeft,
      ownGlasses,
      procedureName,
      surgeonName,
      dateOfDischarge,
      diagnosis,
      registrationDateTime,
      otDateTime: parsedOtDateTime, // Map otDatetime to otDateTime
      surgeryDate,
      surgeryPlace,
      operatedEye,
      followPlace,
      medication,
      finalDiagnosis,
      others,
      firstVisit: parsedFirstVisit,
      secondVisit: parsedSecondVisit,
      referredBy,
    });

    // Save the patient record to the database
    await newPatient.save();

    res.status(201).json({ message: "Patient data submitted successfully!" });
  } catch (error) {
    console.error("Error submitting patient data:", error);
    res.status(500).json({ message: "Failed to submit patient data." });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patient data
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Failed to fetch patients." });
  }
};

// patientController.js
const getPatientDetails = async (req, res) => {
  try {
    const { regNo } = req.params; // Get the regNo from URL params

    // Query for the patient using regNo, NOT _id
    const patient = await Patient.findOne({ regNo: regNo });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json(patient); // Return the patient details
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Failed to fetch patient details." });
  }
};

module.exports = { submitPatientData, getAllPatients, getPatientDetails };
