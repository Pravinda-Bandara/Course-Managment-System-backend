// routes/enrollmentRoutes.js
import express from 'express';
const router = express.Router();
import { isAuth } from '../utils.js';
import {
    createEnrollment, deleteEnrollmentById, getCoursesWithEnrollmentStatus,

    getEnrollmentsByStudentId, getEnrollmentStatus
} from "../controllers/enrollmentController.js";

router.get('/status', isAuth, getEnrollmentStatus);
router.get('/:studentId', isAuth, getEnrollmentsByStudentId);
router.delete('/:id', isAuth, deleteEnrollmentById);
router.post('/', isAuth, createEnrollment);
router.route('/detailed/:studentId').get(getCoursesWithEnrollmentStatus);

export default router;
