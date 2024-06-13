import express from 'express';
import {
    getUserById,
    signin,
    signup,
    updateUser,
    deleteUser, getUsers,
} from '../controllers/userController.js';
import { isAuth, isAdmin } from '../utils.js';

const router = express.Router();

router.patch('/:id', isAuth, isAdmin, updateUser);
router.delete('/:id', isAuth, isAdmin, deleteUser);
router.get('/', isAuth, isAdmin, getUsers);

router.get('/:id', isAuth, getUserById);

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
