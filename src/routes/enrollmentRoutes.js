// routes/enrollmentRoutes.js
import express from 'express';
const router = express.Router();
import { isAuth } from '../utils.js';
import {
    createEnrollment, deleteEnrollmentById,

    getEnrollmentsByStudentId, getEnrollmentStatus
} from "../controllers/enrollmentController.js";

router.get('/status', isAuth, getEnrollmentStatus); // Fetch all enrollments by student ID
router.get('/:studentId', isAuth, getEnrollmentsByStudentId); // Fetch all enrollments by student ID
router.delete('/:id', isAuth, deleteEnrollmentById);

router.route('/').post(isAuth, createEnrollment)           // Create new enrollment


export default router;
