const axios = require("axios");

const API = "http://localhost:5000/api/surgeon/add-surgeon"; // your API endpoint

const surgeons = [
  "Dr Venkatesan",
  "Dr Sathish Kumar",
  "Dr Malarvizhi",
  "Dr Nivas",
  "Dr Subashree",
  "Dr Arun Kumar",
  "Dr Ashwini",
  "Dr Balakrishnan",
  "Dr Elakkiya",
  "Dr Gangadhar",
  "Dr Gangadharan",
  "Dr Kauser Parveen",
  "Dr Malarchelvi",
  "Dr Manish",
  "Dr Padmaja",
  "Dr Padmaja*", // double entry
  "Dr Padmapriya",
  "Dr Pavan",
  "Dr Prem Anand",
  "Dr Priya",
  "Dr Pushpa",
  "Dr R. Santhanalakshmi",
  "Dr Rajesh Kannan",
  "Dr Ranganathan",
  "Dr Rathnakumar",
  "Dr Rekha Sankar",
  "Dr Senthil Kumar",
  "Dr Shankar",
  "Dr Shankar (Chettinad)",
  "Dr Shiva Ranjini",
  "Dr Shivakumar",
  "Dr Shivakumar*", // double entry
  "Dr Sree Lakshmi",
  "Dr Srinivasan",
  "Dr Srividya",
  "Dr Subasree",
  "Dr Venkatesan Chellappa",
  "Dr Nivetha",
  "Dr Suruthi",
  "Dr Kalaimani",
  "Dr Saravanan",
  "Dr Pani malar",
];

async function seed() {
  for (let name of surgeons) {
    try {
      const res = await axios.post(API, { name });
      console.log(`✅ Inserted: ${name}`);
    } catch (err) {
      console.error(
        `❌ Failed: ${name} - ${err.response?.data?.error || err.message}`
      );
    }
  }
}

seed();
