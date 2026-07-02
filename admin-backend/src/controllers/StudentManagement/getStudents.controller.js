//src/controllers/StudentManagement/getStudents.controller.js
const Student = require('../../models/Student');

module.exports = async (req, res) => {
  try {
    let {
      searchTerm,
      Branch,
      Batch,
      Status,
      Counselor,
      page = 1,
      limit = 5
    } = req.query;

    const query = {};

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;
    if (page < 1) page = 1;
    if (limit < 1) limit = 5;


    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { rollNo: searchRegex }, 
        { branch: searchRegex },
        { email: searchRegex }, 
        { batch: searchRegex },
      ];
    }

    if (Branch) query.branch = Branch; 
    if (Batch) query.batch = Batch;
    if (Status) query.status = Status;
    if (Counselor) query.counselor = Counselor;


    const totalStudents = await Student.countDocuments(query);
    const students = await Student.find(query)
                                  .sort({ createdAt: -1 })
                                  .skip((page - 1) * limit)
                                  .limit(limit)
                                  .lean();

    res.status(200).json({
      students,
      totalStudents,
      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
    });

  } catch (err) {
    res.status(500).json({
      students: [],
      totalStudents: 0,
      currentPage: 1,
      totalPages: 0, 
      message: 'Server Error while fetching students',
      error: err.message
    });
  }
};