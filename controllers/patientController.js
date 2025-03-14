const Patient = require("../models/patientModel");

// ✅ Function to parse date strings into Date objects
const parseDate = (dateString) => {
  if (!dateString) return null;

  try {
    if (dateString.includes(" ")) {
      return new Date(dateString.replace(" ", "T") + "Z");
    }
    if (dateString.length === 16) {
      return new Date(dateString + ":00.000Z");
    }
    if (dateString.length === 10) {
      return new Date(dateString + "T00:00:00.000Z");
    }
    return new Date(dateString);
  } catch (error) {
    console.error("Error parsing date:", dateString);
    return null;
  }
};

// ✅ Check if a Registration Number (regNo) exists
const checkRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;
    const existingPatient = await Patient.findOne({ regNo });

    if (existingPatient) {
      return res.status(200).json({ exists: true, message: "RegNo exists." });
    } else {
      return res
        .status(200)
        .json({ exists: false, message: "RegNo available." });
    }
  } catch (error) {
    console.error("Error checking regNo:", error);
    res.status(500).json({ message: "Failed to check regNo." });
  }
};

// ✅ Submit patient data
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

    // ✅ Check if patient already exists before creating a new one
    const existingPatient = await Patient.findOne({ regNo });
    if (existingPatient) {
      return res
        .status(409)
        .json({ error: "Patient with this regNo already exists." });
    }

    // ✅ Parse date fields
    const parsedOtDateTime = parseDate(otDateTime);
    const parsedFirstVisit = parseDate(firstVisit);
    const parsedSecondVisit = parseDate(secondVisit);

    // ✅ Validate parsed dates
    if (
      (parsedOtDateTime && isNaN(parsedOtDateTime.getTime())) ||
      (parsedFirstVisit && isNaN(parsedFirstVisit.getTime())) ||
      (parsedSecondVisit && isNaN(parsedSecondVisit.getTime()))
    ) {
      return res.status(400).json({ message: "Invalid date format provided." });
    }

    // ✅ Create a new patient record
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
      otDateTime: parsedOtDateTime, // ✅ Store parsed date
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

    // ✅ Save the patient record to the database
    await newPatient.save();

    res.status(201).json({ message: "Patient data submitted successfully!" });
  } catch (error) {
    console.error("Error submitting patient data:", error);
    res.status(500).json({ message: "Failed to submit patient data." });
  }
};

// ✅ Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find(); // ✅ Fetch all patient data
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Failed to fetch patients." });
  }
};

// ✅ Get patient details by regNo
const getPatientDetails = async (req, res) => {
  try {
    const { regNo } = req.params; // ✅ Get the regNo from URL params

    // ✅ Query for the patient using regNo, NOT _id
    const patient = await Patient.findOne({ regNo });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json(patient); // ✅ Return the patient details
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Failed to fetch patient details." });
  }
};

module.exports = {
  submitPatientData,
  getAllPatients,
  getPatientDetails,
  checkRegNo, // ✅ Correctly exported function
};
