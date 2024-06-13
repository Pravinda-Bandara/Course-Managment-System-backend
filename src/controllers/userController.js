import express from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Enrollment from "../models/enrollment.js";

const router = express.Router();

// Get user by ID
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
});

// Get all admins (admin only)
export const getAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({ role: 'admin' });
    res.send(admins);
});

// Get all students (admin only)
export const getStudents = asyncHandler(async (req, res) => {
    const students = await User.find({ role: 'student' });
    res.send(students);
});

// Sign in
export const signin = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});

// Sign up
export const signup = asyncHandler(async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
    });
});

// Update user (admin only)
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
});

// Delete user (admin only)
export const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user) {
        if (user.email === 'admin@example.com') {
            res.status(400).send({ message: 'Cannot Delete Admin User' });
            return;
        }
        await user.deleteOne();  // Use deleteOne() to remove the document
        await Enrollment.deleteMany({ studentId:req.params.id });
        res.send({ message: 'User Deleted' });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
});

export default router;
