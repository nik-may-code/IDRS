//src/controllers/StudentManagement/deleteStudent.controller.js
const Student = require('../../models/Student');

module.exports = async (req, res) => {
    const { rollNo } = req.params; 

    if (!rollNo) {
        return res.status(400).json({ message: 'Roll No. is required.' });
    }

    try {
        const student = await Student.findOne({ rollNo: rollNo.toUpperCase() });

        if (!student) {
            return res.status(404).json({ message: 'Student not found with the provided Roll No.' });
        }

        await Student.findOneAndDelete({ rollNo: rollNo.toUpperCase() });

        res.status(200).json({ message: `Student with Roll No. ${rollNo} deleted successfully.` });

    } catch (err) {
        res.status(500).json({ message: 'Server error while deleting student.', error: err.message });
    }
};