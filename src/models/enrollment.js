import mongoose from "mongoose";
import Course from "./course.js";

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});

const Enrollment = mongoose.model('EnrollmentModel', enrollmentSchema);

export default Enrollment;
