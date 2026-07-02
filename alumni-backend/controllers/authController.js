const User = require("../models/Alumni");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN CONTROLLER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.ALUMNI_JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        alumniId: user.alumniId,
        contactNumber: user.contactNumber,
        degree: user.degree,
        graduationYear: user.graduationYear,
        currentPosition: user.currentPosition,
        company: user.company,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// REGISTER CONTROLLER
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    alumniId,
    contactNumber,
    degree,
    graduationYear,
    currentPosition,
    company,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !password ||
    !alumniId ||
    !contactNumber ||
    !degree ||
    !graduationYear
  )
    return res.status(400).json({
      success: false,
      message:
        "All required fields must be filled (name, email, password, alumniId, contactNumber, degree, graduationYear)",
    });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { alumniId }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      if (existingUser.alumniId === alumniId) {
        return res
          .status(400)
          .json({ success: false, message: "Alumni ID already registered" });
      }
    }

    // Create new user - password will be hashed by pre-save hook
    const newUser = new User({
      name,
      email,
      password, // Don't hash here, let the model's pre-save hook handle it
      alumniId,
      contactNumber,
      degree,
      graduationYear,
      currentPosition,
      company,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.ALUMNI_JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        alumniId: newUser.alumniId,
        contactNumber: newUser.contactNumber,
        degree: newUser.degree,
        graduationYear: newUser.graduationYear,
        currentPosition: newUser.currentPosition,
        company: newUser.company,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { loginUser, registerUser };
