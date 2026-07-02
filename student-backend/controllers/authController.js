const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Simple email validator
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// LOGIN CONTROLLER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    if (!process.env.STUDENT_JWT_SECRET) {
      console.error("FATAL: STUDENT_JWT_SECRET is not set in environment");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.STUDENT_JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        contactNumber: user.contactNumber,
        major: user.major,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// REGISTER CONTROLLER
const registerUser = async (req, res) => {
  const { name, email, password, studentId, contactNumber, major } = req.body;

  if (!name || !email || !password || !studentId || !contactNumber || !major)
    return res.status(400).json({
      success: false,
      message:
        "All fields are required (name, email, password, studentId, contactNumber, major)",
    });

  if (!isValidEmail(email))
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });

  if (password.length < 8)
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { studentId }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase().trim()) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      if (existingUser.studentId === studentId) {
        return res
          .status(400)
          .json({ success: false, message: "Student ID already registered" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      studentId: studentId.trim(),
      contactNumber: contactNumber.trim(),
      major,
    });

    await newUser.save();

    if (!process.env.STUDENT_JWT_SECRET) {
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    const token = jwt.sign({ id: newUser._id }, process.env.STUDENT_JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        studentId: newUser.studentId,
        contactNumber: newUser.contactNumber,
        major: newUser.major,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { loginUser, registerUser };
