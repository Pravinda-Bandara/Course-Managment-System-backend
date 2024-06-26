

import asyncHandler from "express-async-handler";
import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";

export const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});


export const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});


export const createCourse = asyncHandler(async (req, res) => {
    const { title, description, duration, instructor, instructor_num } = req.body;
    const course = new Course({
        title,
        description,
        duration,
        instructor,
        instructor_num
    });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
});


export const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, duration, instructor, instructor_num } = req.body;
    const course = await Course.findById(req.params.id);
    if (course) {
        course.title = title;
        course.description = description;
        course.duration = duration;
        course.instructor = instructor;
        course. instructor_num =  instructor_num;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});


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
