// routes/courseRoutes.js
import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import Course from '../models/course.js';
import {isAdmin, isAuth} from "../utils.js";

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const courses = await Course.find();
        res.json(courses);
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const course = await Course.findById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    })
);

router.post(
    '/',
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
        const { title, description, duration, instructor } = req.body;
        const course = new Course({
            title,
            description,
            duration,
            instructor,
        });
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    })
);

router.patch(
    '/:id',
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
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
    })
);

router.delete(
    '/:id',
    isAuth,
    isAdmin,
    asyncHandler(async (req, res) => {
        const course = await Course.findById(req.params.id);
        if (course) {
            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    })
);

export default router;
