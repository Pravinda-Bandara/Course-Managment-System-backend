// models/course.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    instructor_num: { type: String, required: true },
});

const Course = mongoose.model('Coursemodels', courseSchema);

export default Course;
