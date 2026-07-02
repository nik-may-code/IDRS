//src/controllers/StudentManagement/charts/getPlacementStatus.controller.js
const Student = require('../../../models/Student');

module.exports = async (req, res) => {
    try {
        const placementDataByYear = await Student.aggregate([
            {
                $match: {
                    "progress.placementStatus": { 
                        $exists: true, 
                        $ne: null, 
                        $ne: "",
                        $regex: /placed/i 
                    }
                }
            },
            {
                $group: {
                    _id: "$batch",          
                    count: { $sum: 1 }      
                }
            },
            {
                $project: {
                    batch: "$_id",          
                    placedCount: "$count", 
                    _id: 0
                }
            },
            { $sort: { batch: 1 } }         
        ]);


        const labels = placementDataByYear.map(item => item.batch || "N/A"); 
        const data = placementDataByYear.map(item => item.placedCount);    

        res.status(200).json({
            labels: labels,
            datasets: [{
                label: 'Students Placed per Year (Batch)',
                data: data,
            }]
        });
    } catch (err) {
        console.error("Error in getPlacementStatus (Year-wise, by progress field):", err.message);
        res.status(500).json({ message: 'Server Error fetching year-wise placement status', error: err.message });
    }
};