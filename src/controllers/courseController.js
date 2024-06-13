

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
import asyncHandler from "express-async-handler";
import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";

export const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = asyncHandler(async (req, res) => {
    const { title, description, duration, instructor } = req.body;
    const course = new Course({
        title,
        description,
        duration,
        instructor,
    });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
});

// @desc    Update a course
// @route   PATCH /api/courses/:id
// @access  Private/Admin
export const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, duration, instructor } = req.body;
    const course = await Course.findById(req.params.id);
    if (course) {
        course.title = title;
        course.description = description;
        course.duration = duration;
        course.instructor = instructor;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        await course.deleteOne();
        await Enrollment.deleteMany({ courseId: req.params.id });
        res.json({ message: 'Course removed' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});
