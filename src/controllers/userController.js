import express from 'express';
import asyncHandler from 'express-async-handler';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import Enrollment from "../models/enrollment.js";
import {validateLoginInput, validateRegistrationInput} from "../Utils/userValidationUtil.js";

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
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.send(users);
});



// Sign up
export const signup = asyncHandler(async (req, res) => {
    const { name, email, number, password } = req.body;
    const validationError = validateRegistrationInput(name, email, number, password);
    if (validationError) {
        return res.status(400).send({ message: validationError });
    }

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send({ message: 'Email is already registered' });
    }

    // If email is not registered, proceed to create a new user
    const user = await User.create({
        name,
        email,
        number,
        password: bcrypt.hashSync(password, 8)
    });

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        number: user.number,
        token: generateToken(user),
    });
});

// Sign in
export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const validationError = validateLoginInput(email, password);
    if (validationError) {
        return res.status(400).send({ message: validationError });
    }

    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            number: user.number,
            token: generateToken(user),
        });
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});

// Update user (admin only)
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.number = req.body.number || user.number;
        const updatedUser = await user.save();
        const { password, ...userWithoutPassword } = updatedUser.toObject(); // Exclude password from the response
        res.send({ message: 'User Updated', user: userWithoutPassword });
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
