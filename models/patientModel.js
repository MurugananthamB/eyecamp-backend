const mongoose = require("mongoose");
const Counter = require("./createModel");

const patientSchema = new mongoose.Schema({
  regNo: { type: Number, unique: true }, // Auto-generated registration number
  title: { type: String, required: true },
  patientName: { type: String, required: true },
  fatherOrCO: { type: String, required: true },
  attenderName: { type: String, required: true },
  attenderMobile: { type: String },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  otherDistrict: { type: String },
  email: { type: String },
  visualRight: { type: String },
  visualLeft: { type: String },
  ownGlasses: { type: String },
  procedureName: { type: String },
  surgeonName: { type: String },
  diagnosis: { type: String },
  registrationDateTime: { type: Date },
  otDateTime: {
    type: Date,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
  },
  surgeryDate: { type: Date },
  surgeryPlace: { type: String },
  operatedEye: { type: String },
  followPlace: { type: String },
  medication: { type: [String] },
  finalDiagnosis: { type: String },
  others: { type: String },
  firstVisit: {
    type: Date,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
  },
  secondVisit: {
    type: Date,
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v);
      },
      message: (props) => `${props.value} is not a valid date!`,
    },
  },
  referredBy: { type: String },
});

// Pre-save hook to auto-generate regNo
patientSchema.pre("save", async function (next) {
  if (!this.regNo) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "patientRegNo" }, // Identifier for the counter
      { $inc: { sequence_value: 1 } }, // Increment the sequence value
      { new: true, upsert: true } // Create the counter if it doesn't exist
    );
    this.regNo = counter.sequence_value; // Assign the incremented value to regNo
  }
  next();
});

module.exports = mongoose.model("Patient", patientSchema);
