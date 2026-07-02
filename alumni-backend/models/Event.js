const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  attendees: [{ type: String }], // Array of alumni names or IDs who RSVP'd
}, {
  timestamps: true,
});

module.exports = mongoose.model("Event", EventSchema);
