// File: backend/routes/leaves.routes.js

const express = require('express');
const router = express.Router();
const LeaveBalance = require('../models/leaves/LeavesRemaining.model');
const LeaveRequest = require('../models/leaves/LeaveRequest.model');
const auth = require('../middleware/auth');

// --- Helper: Find or Create Leave Balance by Faculty ID ---
// This helper ensures that every user has a leave balance record, creating one if it doesn't exist.
const findOrCreateFacultyById = async (faculty_id) => {
  if (!faculty_id || typeof faculty_id !== 'string') {
    throw new Error("Faculty ID is missing or invalid.");
  }

  let faculty = await LeaveBalance.findOne({ faculty_id });

  if (!faculty) {
    console.log(`Faculty with ID ${faculty_id} not found. Creating new leave balance entry.`);

    faculty = new LeaveBalance({
      faculty_id,
      leaveBalances: {
        sick: 20,
        casual: 18,
        earned: 12,
        maternity: 0
      }
    });

    try {
      await faculty.save();
    } catch (err) {
      if (err.code === 11000) {
        console.warn("⚠️ Duplicate faculty_id found after race condition:", faculty_id);

        // 👇 Try again with short delay
        faculty = await LeaveBalance.findOne({ faculty_id });
        if (!faculty) {
          await new Promise(resolve => setTimeout(resolve, 100));
          faculty = await LeaveBalance.findOne({ faculty_id });
        }
      } else {
        throw err;
      }
    }
  }

  if (!faculty) {
    const allDocs = await LeaveBalance.find({});
    console.log('📋 All LeaveBalance documents:', allDocs); // TEMP DEBUG
    throw new Error('Faculty record could not be created or fetched.');
  }

  return faculty;
};




// --- GET: Leave Balances + Requests for Logged-in Faculty ---
// This route is protected and uses the 'auth' middleware.
// It fetches all leave-related data for the currently authenticated user.
router.get('/user', auth, async (req, res) => {
  try {
    const { faculty_id } = req.user;
    if (!faculty_id) {
      return res.status(400).json({ message: 'Faculty ID not found in token.' });
    }

    const faculty = await findOrCreateFacultyById(faculty_id);
    const lb = faculty.leaveBalances || {}; // null-safe

    const balances = {
      'Sick Leave': lb.sick ?? 0,
      'Casual Leave': lb.casual ?? 0,
      'Earned Leaves': lb.earned ?? 0,
      'Maternity Leaves': lb.maternity ?? 0,
    };

    const requests = await LeaveRequest.find({ faculty_id }).sort({ createdAt: -1 });

    res.status(200).json({
      leaveBalances: balances,
      leaveRequests: requests,
    });
  } catch (error) {
    console.error('Error fetching faculty leave data:', error.message);
    res.status(500).json({ message: 'Error fetching faculty leave data', error: error.message });
  }
});



// --- POST: Submit New Leave Request ---
// This route is also protected by the 'auth' middleware.
// It allows an authenticated user to submit a new leave application.
router.post('/', auth, async (req, res) => {
  // Destructure the required fields from the request body.
  const { leaveType, reason, startDate, endDate, contact, applicationFormUrl } = req.body;

  try {
    // Get the faculty_id from the authenticated user's token, not from the request body.
    const { faculty_id } = req.user;

    // Robustness check: Ensure faculty_id was in the token.
    if (!faculty_id) {
      return res.status(400).json({ message: 'Faculty ID not found in token. Cannot submit leave.' });
    }

    // Ensure a balance entry exists for this user before creating a request.
    await findOrCreateFacultyById(faculty_id);

    // Create a new leave request document.
    const newLeaveRequest = new LeaveRequest({
      faculty_id, // Use the ID from the token for security
      leaveType,
      reason,
      startDate,
      endDate,
      contact, // Added contact to the model persistence
      applicationFormUrl: applicationFormUrl || '', // Handle case where no file is uploaded
    });

    // Save the new request to the database.
    const savedRequest = await newLeaveRequest.save();

    // Respond with the newly created leave request object.
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating leave request:', error.message);
    res.status(500).json({ message: 'Error creating leave request', error: error.message });
  }
});

module.exports = router;