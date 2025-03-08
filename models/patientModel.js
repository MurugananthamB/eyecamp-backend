const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Patient", patientSchema);
