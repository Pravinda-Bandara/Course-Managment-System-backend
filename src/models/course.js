// src/models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number },
    instructor: { type: String },
});

const Course = mongoose.model('CourseModel', courseSchema);

export default Course;
