const User = require("../models/user"); // Adjust path if needed
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, employeeId, password } = req.body;

    // Check if the employee ID already exists
    const existingUser = await User.findOne({ employeeId });
    if (existingUser) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      employeeId,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT Token (without expiration)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "User Registered Successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Check if user exists using employeeId
    const user = await User.findOne({ employeeId });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: "Invalid Employee ID or Password" });
    }

    // Generate JWT Token (Non-Expiring)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        role: user.role, // Optional: Include user role if needed
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Get all users (Protected Route)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUserName = async (req, res) => {
  try {
    const { firstName } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: `User status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



