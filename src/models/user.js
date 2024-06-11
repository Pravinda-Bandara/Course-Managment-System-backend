import mongoose from "mongoose";
import Enrollment from "./enrollment.js";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' }
});

const User = mongoose.model('UserModel', userSchema);

export default User;
