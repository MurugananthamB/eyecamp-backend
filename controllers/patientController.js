const Patient = require("../models/patientModel");

// Submit patient data
const submitPatientData = async (req, res) => {
  try {
    const {
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

    // Parse all date fields
    const parsedOtDateTime = parseDate(otDateTime); // Use otDatetime from payload
    const parsedFirstVisit = parseDate(firstVisit);
    const parsedSecondVisit = parseDate(secondVisit);

    // Validate parsed dates
    if (!parsedOtDateTime || isNaN(parsedOtDateTime.getTime())) {
      return res.status(400).json({ message: "Invalid otDateTime format." });
    }

    // Create a new patient record
    const newPatient = new Patient({
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

module.exports = { submitPatientData };
