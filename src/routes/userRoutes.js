import express from 'express';
const router = express.Router();
import {
    getUserById,
    getAdmins,
    getStudents,
    signin,
    signup,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
import { isAuth, isAdmin } from '../utils.js';

// Map routes to controller functions
router.route('/:id').get(isAuth, getUserById).patch(isAuth, isAdmin, updateUser).delete(isAuth, isAdmin, deleteUser);
router.get('/admins', isAuth, isAdmin, getAdmins);
router.get('/students', isAuth, isAdmin, getStudents);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;
