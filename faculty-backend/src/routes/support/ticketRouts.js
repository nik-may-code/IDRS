const express = require('express');
const router = express.Router();
const transporter = require('../../config/support/mailer'); // Import mailer configuration
const Ticket = require('../../models/support/Ticket'); // Import Ticket model

// Create ticket
router.post('/', async (req, res) => {
  try {
    const { email, subject, issue } = req.body;

    const newTicket = await Ticket.create({ email, subject, issue });

    // Send email notification
    console.log('Preparing to send ticket notification email...');
    await transporter.sendMail({
      from: `"Support System" <${process.env.ADMIN_EMAIL_USER}>`,
      to: 'kitswcse3@gmail.com',
      subject: `New Ticket: ${subject}`,
      text: `From: ${email} \n\nIssue: ${issue}`,
    });

    res.status(201).json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ created: -1 });
    res.json(tickets.map(t => ({
      id: t._id,
      title: t.subject,
      status: t.status,
      created: t.created.toISOString().slice(0, 10),
      description: t.issue,
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Test email route
router.get('/test-mail', async (req, res) => {
  try {
    await transporter.sendMail({
      from: `"Support System" <${process.env.ADMIN_EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL_USER, // send to yourself for testing
      subject: 'Test Email',
      text: 'This is a test email from your backend.',
    });
    res.json({ success: true, message: 'Test email sent' });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send test email', details: err.message });
  }
});

module.exports = router;