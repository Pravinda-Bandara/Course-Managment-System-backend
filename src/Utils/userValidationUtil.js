// Utils/userValidationUtil.js

export const validateLoginInput = (email, password) => {
    if (!email || typeof email !== 'string') {
        return 'Email is required and must be a valid string.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please provide a valid email address.';
    }
    if (!password || typeof password !== 'string') {
        return 'Password is required and must be a valid string.';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null; // No validation errors
};

export const validateRegistrationInput = (name, email, number, password) => {
    if (!name || typeof name !== 'string') {
        return 'Name is required and must be a valid string.';
    }
    if (!email || typeof email !== 'string') {
        return 'Email is required and must be a valid string.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please provide a valid email address.';
    }
    const numberRegex = /^(?:\+?\d{1,3}[-.\s]?)?\d{10}$/;
    if (!number || !numberRegex.test(number)) {
        return 'Please provide a valid 10-digit phone number.';
    }
    if (!password || typeof password !== 'string') {
        return 'Password is required and must be a valid string.';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null; // No validation errors
};
