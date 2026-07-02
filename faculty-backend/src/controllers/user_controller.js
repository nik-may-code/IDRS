const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Must be 32 bytes for AES-256
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const IV_LENGTH = 16;

// --- AES Encryption ---
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// --- AES Decryption ---
function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// --- Register Controller ---
exports.register = async (req, res) => {
  const { name, faculty_id, password } = req.body;
  if (!name || !faculty_id || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const existingUser = await User.findOne({ faculty_id });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedPassword = encrypt(hashedPassword);
    const user = new User({ name, faculty_id, password: encryptedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// --- Login Controller ---
exports.login = async (req, res) => {
  const { faculty_id, password } = req.body;
  if (!faculty_id || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ faculty_id });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const decryptedPassword = decrypt(user.password);
    const match = await bcrypt.compare(password, decryptedPassword);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, faculty_id: user.faculty_id, name: user.name },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30m' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// --- Logout (Frontend Only) ---
exports.logout = async (req, res) => {
  // No real effect unless you're tracking tokens server-side (e.g. Redis)
  res.status(200).json({ message: 'Logged out successfully' });
};

// --- Protected Route Example ---
exports.profile = async (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.name}`,
    user: req.user
  });
};