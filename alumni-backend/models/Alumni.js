const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AlumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    alumniId: {
      type: String,
      required: [true, "Alumni ID is required"],
      unique: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    graduationYear: {
      type: Number,
      required: [true, "Graduation year is required"],
      min: 1950,
      max: new Date().getFullYear(), // <-- FIXED: max should be a number, not array
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      enum: ["B.Tech", "M.Tech", "MCA", "MBA", "PhD", "Other"],
      trim: true,
    },
    currentPosition: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Hash password before saving
AlumniSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Method to compare passwords
AlumniSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Alumni", AlumniSchema);