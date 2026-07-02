// src/controllers/StudentManagement/getStudentFilterOptions.controller.js
const Student = require('../../models/Student'); 

const getStudentFilterOptions = async (req, res) => {
    try {
        const distinctBranches = await Student.distinct('branch').then(list => list.filter(Boolean).sort());
        
        const distinctBatches = await Student.distinct('batch').then(list => 
            list.filter(Boolean).sort((a, b) => {
                const numA = parseInt(a, 10);
                const numB = parseInt(b, 10);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return numB - numA;
                }
                return String(b).localeCompare(String(a));
            })
        );
        
        const distinctCounselors = await Student.distinct('counselor').then(list => list.filter(Boolean).sort());
        const distinctStatuses = await Student.distinct('status').then(list => list.filter(Boolean).sort());

        res.json({
            Branch: distinctBranches || [],
            Batch: distinctBatches || [],
            Counselor: distinctCounselors || [],
            Status: distinctStatuses|| [],
        });
    } catch (error) {
        console.error("Error fetching filter options:", error);
        res.status(500).json({ message: "Failed to fetch filter options", error: error.message });
    }
};

module.exports = getStudentFilterOptions;