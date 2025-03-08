const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load JWT_SECRET from .env

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFkbWluIiwiZW1haWwiOiJ0ZWNoc3VwcG9ydEBtYXBpbXMuZWR1LmluIiwiaWF0IjoxNzQxNDEzMzU5LCJleHAiOjE3NDE0MTY5NTl9.74ki-tzHOqV-ZB38B7YCl-W8ghHNaOaBWQRD-dWy4d0"; // Replace with actual token
const secret = process.env.JWT_SECRET;

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token is valid! Decoded data:", decoded);
} catch (err) {
  console.error("❌ Invalid Token!", err.message);
}
