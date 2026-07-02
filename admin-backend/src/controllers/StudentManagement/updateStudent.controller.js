//src/controllers/StudentManagement/updateStudent.controller.js
const Student = require('../../models/Student');

module.exports = async (req, res) => {
    const { rollNo } = req.params;
    const updateData = req.body;

    if (!rollNo) {
        return res.status(400).json({ message: 'Roll No. is required for updating.' });
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No update data provided.' });
    }
    if (updateData.rollNo && updateData.rollNo.toUpperCase() !== rollNo.toUpperCase()) {
        return res.status(400).json({ message: 'Roll No. in body does not match Roll No. in URL. Cannot update Roll No. via this route.' });
    }
    delete updateData.rollNo; 
    delete updateData._id; 

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { rollNo: rollNo.toUpperCase() }, 
            { $set: updateData }, 
            { new: true, runValidators: true, context: 'query' }
        ).lean();

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found with the provided Roll No.' });
        }

        res.status(200).json({
            message: `Student with Roll No. ${rollNo} updated successfully.`,
            data: updatedStudent
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: 'Validation failed.', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: `Invalid data format for field: ${err.path}`, value: err.value });
        }

        if (err.code === 11000) { 
             const field = Object.keys(err.keyPattern)[0];
             return res.status(409).json({ message: `An account with that ${field} already exists.`});
        }
        res.status(500).json({ message: 'Server error while updating student.', error: err.message });
    }
};