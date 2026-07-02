// controllers/notice/usernotice/get.js

const Notice = require('../../../models/notice');

// --- GET all notices created by the logged-in user ---
exports.getNotices = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { search = "", audience = "", date = "", page = 1, limit = 8, sort = "desc" } = req.query;

    const query = { userid: loggedInUserId }; // Base query to get user's own notices

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }];
    }
    if (audience && audience !== "All") {
      query.recipients = audience;
    }
    // Date filtering logic can be added here if needed, based on your previous code

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    const sortOrder = sort === "asc" ? 1 : -1;

    const notices = await Notice.find(query).sort({ date: sortOrder }).skip(skip).limit(limitInt);
    const total = await Notice.countDocuments(query);
    const totalPages = Math.ceil(total / limitInt);

    res.json({
      data: notices,
      pagination: { total, page: pageInt, pages: totalPages, limit: limitInt },
    });
  } catch (err) {
    console.error("Error fetching user notices:", err);
    res.status(500).json({ message: "Failed to fetch notices." });
  }
};