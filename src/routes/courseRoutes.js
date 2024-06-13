import express from 'express';
import {createCourse, deleteCourse, getCourseById, getCourses, updateCourse} from "../controllers/courseController.js";
import {isAdmin, isAuth} from "../utils.js";


const router = express.Router();

router.get('/', getCourses);

router.get('/:id', getCourseById);

router.post('/', isAuth, isAdmin, createCourse);

router.patch('/:id', isAuth, isAdmin, updateCourse);

router.delete('/:id', isAuth, isAdmin, deleteCourse);

export default router;
