const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a resource within a unit
const ResourceSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  icon: { type: String }
});

// Define the schema for a unit within a course
const UnitSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  resources: [ResourceSchema] // Embeds the resource schema
});

// Define the main course schema
const CourseDetailSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  instructor: { type: String, required: true },
  units: [UnitSchema] // Embeds the unit schema
}, {
  // Optional: Adds createdAt and updatedAt timestamps
  timestamps: true
});

// Create the model from the schema
const CourseDetail = mongoose.model('CourseDetail', CourseDetailSchema);

module.exports = CourseDetail;