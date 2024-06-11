// routes/enrollmentRoutes.js
import express from 'express';
const router = express.Router();
import { isAuth } from '../utils.js';
import {
    createEnrollment, deleteEnrollmentById,

    getEnrollmentsByStudentId
} from "../controllers/enrollmentController.js";


router.get('/:studentId', isAuth, getEnrollmentsByStudentId); // Fetch all enrollments by student ID
router.delete('/:id', isAuth, deleteEnrollmentById);

router.route('/').post(isAuth, createEnrollment)           // Create new enrollment


export default router;
