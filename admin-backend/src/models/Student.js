// src/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: [true, 'Roll No. is required'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  branch: { 
    type: String,
    required: [true, 'Branch is required'],
    trim: true,
  },
  batch: {
    type: String,
    required: [true, 'Batch is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  status: {
    type: String,
    enum: ['Active', 'Graduated'], 
    default: 'Active',
  },
  counselor: {
    type: String,
    trim: true,
    default: '',
  },
  progress: {
    placementStatus: { type: String, trim: true, default: 'Not Placed' }, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

StudentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.isModified('rollNo') && this.rollNo) {
    this.rollNo = this.rollNo.toUpperCase();
  }
  if (!this.progress) {
    this.progress = {};
  }
  if (this.progress.placementStatus === undefined || this.progress.placementStatus === null) {
      this.progress.placementStatus = 'Not Placed';
  }
  next();
});

StudentSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  const update = this.getUpdate();
  if (update.$set && update.$set.rollNo) {
    update.$set.rollNo = update.$set.rollNo.toUpperCase();
  } else if (update.rollNo && typeof update.rollNo === 'string') { 
     update.rollNo = update.rollNo.toUpperCase();
  }

  if (update.$set && update.$set.progress && (update.$set.progress.placementStatus === undefined || update.$set.progress.placementStatus === null)) {
      update.$set.progress.placementStatus = 'Not Placed';
  } else if (update.progress && (update.progress.placementStatus === undefined || update.progress.placementStatus === null)) {
      update.progress.placementStatus = 'Not Placed';
  }

  if (update.$set && update.$set['progress.placementStatus'] === undefined && update.$set.progress !== undefined) {
      update.$set['progress.placementStatus'] = 'Not Placed';
  }


  next();
});

module.exports = mongoose.model('Student', StudentSchema);