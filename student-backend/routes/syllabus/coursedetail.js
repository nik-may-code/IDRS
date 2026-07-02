const express = require('express');
const router = express.Router();
const CourseDetail = require('../../models/CourseDetail'); // Adjust the path to your model file

// --- Course Routes ---

/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    // Check if a course with the same custom 'id' already exists
    const existingCourse = await CourseDetail.findOne({ id: req.body.id });
    if (existingCourse) {
      return res.status(400).json({ msg: 'Course with this ID already exists' });
    }

    const newCourse = new CourseDetail(req.body);
    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const courses = await CourseDetail.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/courses/:id
 * @desc    Get a single course by its custom ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const course = await CourseDetail.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PUT /api/courses/:id
 * @desc    Update a course by its custom ID
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    let course = await CourseDetail.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    course = await CourseDetail.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete a course by its custom ID
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const course = await CourseDetail.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    await CourseDetail.findOneAndDelete({ id: req.params.id });

    res.json({ msg: 'Course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// --- Nested Unit Routes ---

/**
 * @route   POST /api/courses/:courseId/units
 * @desc    Add a unit to a course
 * @access  Public
 */
router.post('/:courseId/units', async (req, res) => {
    try {
        const course = await CourseDetail.findOne({ id: req.params.courseId });
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        course.units.push(req.body);
        await course.save();
        res.status(201).json(course.units);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// --- Nested Resource Routes ---

/**
 * @route   POST /api/courses/:courseId/units/:unitId/resources
 * @desc    Add a resource to a specific unit in a course
 * @access  Public
 */
router.post('/:courseId/units/:unitId/resources', async (req, res) => {
    try {
        const course = await CourseDetail.findOne({ id: req.params.courseId });
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        const unit = course.units.find(u => u.id === req.params.unitId);
        if (!unit) {
            return res.status(404).json({ msg: 'Unit not found' });
        }

        unit.resources.push(req.body);
        await course.save();
        res.status(201).json(unit.resources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;