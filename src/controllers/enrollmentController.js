// controllers/enrollmentController.js
import asyncHandler from 'express-async-handler';
import Enrollment from "../models/enrollment.js";
import User from "../models/user.js";
import Course from "../models/course.js";

// @desc    Fetch all enrollments by student ID
// @route   GET /api/enrollments/student/:studentId
// @access  Private/User

 const getEnrollmentsByStudentId = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({ studentId: req.params.studentId });

    if (enrollments.length > 0) {
        const enrollmentDetails = enrollments.map(enrollment => ({
            enrollmentId: enrollment._id,
            studentId: enrollment.studentId,
            courseId: enrollment.courseId
        }));
        res.json(enrollmentDetails);
    } else {
        res.status(404).json({ message: 'No enrollments found for this student' });
    }
});



// @desc    Create new enrollment
// @route   POST /api/enrollments
// @access  Private/User
const createEnrollment = asyncHandler(async (req, res) => {
    const { studentId, courseId } = req.body;

    const course = await Course.findById(courseId);
    const user = await User.findById(studentId);

    if (!course || !user) {
        res.status(404).json({ message: 'Course or User not found' });
        return;
    }

    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });

    if (existingEnrollment) {
        res.status(400).json({ message: 'Student is already enrolled in this course' });
        return;
    }

    const enrollment = new Enrollment({ studentId, courseId });
    const createdEnrollment = await enrollment.save();
    res.status(201).json(createdEnrollment);
});

// @desc    Delete enrollment by student ID and course ID
// @route   DELETE /api/enrollments
// @access  Private/User
 const deleteEnrollmentById = asyncHandler(async (req, res) => {
    const enrollmentId = req.params.id;

    const enrollment = await Enrollment.findById(enrollmentId);

    if (enrollment) {
        await enrollment.deleteOne();  // Use deleteOne() to remove the document
        res.json({ message: 'Enrollment removed' });
    } else {
        res.status(404).json({ message: 'Enrollment not found' });
    }
});

export { getEnrollmentsByStudentId, createEnrollment, deleteEnrollmentById};
