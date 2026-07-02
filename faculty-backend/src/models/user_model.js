// src/models/user_model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },            
  mobile: { type: String  },            
  dob: { type: Date },
  photoUrl: { type: String }, 
  token: { type: String },  
    
});

module.exports = mongoose.model('faculty_users', userSchema);
