import mongoose from "mongoose";
import Course from "./course.js";
import User from "./user.js";

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    studentEmail: { type: String, required: true },
    courseName: { type: String, required: true }
});

// Middleware to populate studentEmail and courseName
enrollmentSchema.pre('validate', async function(next) {
    const enrollment = this;

    if (enrollment.isModified('studentId')) {
        const user = await User.findById(enrollment.studentId);
        if (user) {
            enrollment.studentEmail = user.email; // assuming User model has email field
        } else {
            return next(new Error('User not found'));
        }
    }

    if (enrollment.isModified('courseId')) {
        const course = await Course.findById(enrollment.courseId);
        if (course) {
            enrollment.courseName = course.title; // assuming Course model has title field
        } else {
            return next(new Error('Course not found'));
        }
    }

    next();
});

const Enrollment = mongoose.model('EnrollmentModel', enrollmentSchema);

export default Enrollment;
