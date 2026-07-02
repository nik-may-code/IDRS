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
      from: `"Support System" <${process.env.EMAIL_USER}>`,
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
      from: `"Support System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // send to yourself for testing
      subject: 'Test Email',
      text: 'This is a test email from your backend.',
    });
    res.json({ success: true, message: 'Test email sent' });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send test email', details: err.message });
  }
});

// Close a ticket and send email notification
router.post('/:id/close', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status: 'Closed' },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (!ticket.email) {
      console.error('Ticket email missing, cannot send notification.');
      return res.status(400).json({ error: 'Ticket email missing, cannot send notification.' });
    }

    // Log ticket object for debugging
    console.log('Ticket object before sending closure email:', ticket);
    // Log before sending email
    console.log(`Sending closure email to ${ticket.email} for ticket '${ticket.subject}'`);
    try {
      await transporter.sendMail({
        from: `"Support System" <${process.env.EMAIL_USER}>`,
        to: ticket.email,
        subject: `Your Ticket '${ticket.subject}' is Closed`,
        text: `Hello,\n\nYour support ticket (Subject: ${ticket.subject}) has been closed. If you have further questions, please open a new ticket.\n\nThank you!`,
      });
      console.log('Closure email sent successfully.');
    } catch (mailErr) {
      console.error('Failed to send closure email:', mailErr);
      return res.status(500).json({ error: 'Ticket closed, but failed to send email', details: mailErr.message });
    }

    res.json({ success: true, message: 'Ticket closed and email sent', ticket });
  } catch (err) {
    console.error('Failed to close ticket:', err);
    res.status(500).json({ error: 'Failed to close ticket', details: err.message });
  }
});

// Delete a ticket by ID
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ success: true, message: 'Ticket deleted', ticket });
  } catch (err) {
    console.error('Failed to delete ticket:', err);
    res.status(500).json({ error: 'Failed to delete ticket', details: err.message });
  }
});

module.exports = router;