const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, default: 'Open' },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);
