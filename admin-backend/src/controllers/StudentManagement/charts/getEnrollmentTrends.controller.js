//src/controllers/StudentManagement/charts/getEnrollmentTrends.controller.js
const Student = require('../../../models/Student');

const branchNameMappings = {
    'Computer Science & Engineering': 'CSE',
    'Computer Science & Networking': 'CSN',
    'Computer Science & AI/ML': 'CSM',
    'Computer Science & Data Science': 'CSD',
    'Computer Science & IoT': 'CSO',
    'Information Technology': 'IT',
    'Electronics & Communication Engineering': 'ECE', 
    'Electronics & Instrumentation': 'ECI',
    'Electrical & Electronics Engineering': 'EEE',
    'Mechanical Engineering': 'ME',
    'Civil Engineering': 'CE'
};

module.exports = async (req, res) => {
    try {
        const trends = await Student.aggregate([
            {
                $group: {
                    _id: "$branch",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    branch: "$_id",
                    count: 1,
                    _id: 0
                }
            },
            { $sort: { branch: 1 } } 
        ]);

        const labels = trends.map(t => {
            const fullBranchName = t.branch || "N/A";
            return branchNameMappings[fullBranchName] || fullBranchName;
        });
        const data = trends.map(t => t.count);

        res.status(200).json({
            labels: labels, 
            datasets: [{
                label: 'Enrollment by Branch', 
                data: data,
            }]
        });
    } catch (err) {
        console.error("Error in getEnrollmentTrends:", err.message);
        res.status(500).json({ message: 'Server Error fetching enrollment trends', error: err.message });
    }
};