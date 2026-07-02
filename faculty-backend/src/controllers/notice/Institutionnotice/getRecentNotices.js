//src/controllers/notice/Institutionnotice/getRecentNotices.js
const Notice = require('../../../models/notice');

exports.getRecentNotices = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Authentication required." });
    }
    const loggedInUserId = req.user.id;

 
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

  
    const query = {
      userid: { $ne: loggedInUserId },
      recipients: { $in: ["All", "Faculty"] }
    };

    const totalNotices = await Notice.countDocuments(query);
    const totalPages = Math.ceil(totalNotices / limit);

    const notices = await Notice.find(query)
      .populate('userid', 'name')
      .sort({ date: -1 }) 
      .skip(skip)
      .limit(limit);


    res.status(200).json({
      notices,
      totalPages,
      currentPage: page,
    });

  } catch (err) {
    console.error("Error fetching recent notices:", err);
    res.status(500).json({ message: "Failed to fetch recent notices." });
  }
};