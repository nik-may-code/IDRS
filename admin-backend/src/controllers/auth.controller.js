const jwt = require("jsonwebtoken");

// Since admin user is currently hardcoded in frontend, we will hardcode it here securely in backend
// In a real production system, this should query a database model
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, this would be a bcrypt hash
};

exports.getauth = (req, res) => {
  res.send("auth data");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password required" });
  }

  // Check against our hardcoded secure backend credential
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    if (!process.env.ADMIN_JWT_SECRET) {
      console.error("FATAL: JWT_SECRET not set in environment");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    const token = jwt.sign(
      { username: ADMIN_CREDENTIALS.username, role: "admin" },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
      user: { username: ADMIN_CREDENTIALS.username, role: "admin" },
    });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid username or password" });
};
