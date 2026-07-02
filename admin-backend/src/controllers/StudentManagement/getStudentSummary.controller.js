// src/controllers/StudentManagement/getStudentSummary.controller.js
const Student = require('../../models/Student'); 

module.exports = async (req, res) => {
    try {
        const dbFilters = {};  
        const { Branch, Batch, Status, Counselor } = req.query;

        if (Branch !== undefined && Branch !== '') dbFilters.branch = Branch;
        if (Batch !== undefined && Batch !== '') dbFilters.batch = Batch;
        if (Status !== undefined && Status !== '') dbFilters.status = Status; // This status is for 'totalStudents'
        if (Counselor !== undefined && Counselor !== '') dbFilters.counselor = Counselor;


        const totalStudents = await Student.countDocuments(dbFilters);
        const graduatedDbFilters = {};
        if (Branch !== undefined && Branch !== '') graduatedDbFilters.branch = Branch;
        if (Batch !== undefined && Batch !== '') graduatedDbFilters.batch = Batch;
        if (Counselor !== undefined && Counselor !== '') graduatedDbFilters.counselor = Counselor;
        graduatedDbFilters.status = 'Graduated'; 

        const graduatedStudents = await Student.countDocuments(graduatedDbFilters);
        
        const studentsPlaced = graduatedStudents;

        res.status(200).json({
            totalStudents,
            graduatedStudents,
            studentsPlaced,
        });
    } catch (err) {
        console.error("Error getting student summary:", err);
        res.status(500).json({ message: 'Server Error getting student summary', error: err.message });
    }
};