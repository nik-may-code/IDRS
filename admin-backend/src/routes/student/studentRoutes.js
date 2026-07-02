// src/routes/student/studentRoutes.js
const express = require('express');
const router = express.Router();

const getStudents = require('../../controllers/StudentManagement/getStudents.controller');
const updateStudentController = require('../../controllers/StudentManagement/updateStudent.controller');
const deleteStudentController = require('../../controllers/StudentManagement/deleteStudent.controller');
const getStudentSummary = require('../../controllers/StudentManagement/getStudentSummary.controller');
const getStudentFilterOptions = require('../../controllers/StudentManagement/getStudentFilterOptions.controller'); 

router.get('/summary', getStudentSummary);
router.get('/students', getStudents);
router.get('/filters', getStudentFilterOptions); 

router.route('/students/:rollNo').put(updateStudentController).delete(deleteStudentController);

module.exports = router;