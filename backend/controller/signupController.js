const asyncHandler = require('async-handler'); //Importing the 'asyncHandler' middleware for error handling in asynchronous routes
const bcrypt = require('bcrypt');     // Import the bcrypt library for password hashing
const User = require('../model/userModel');  // Import the User model

// function to handle user registration
const signup = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        console.log(req.body);  // Log the request body for debugging purposes

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });

        // If the user already exists, return an error response
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already taken' });
        }

        // If the user does not exist, hash the password and create a new user
        const hashedPwd = bcrypt.hashSync(password, 8);
        await User.create({ email, password: hashedPwd });

        // Return a success response upon successful user creation
        res.status(200).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        // Handle any errors that may occur during the registration process
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Exporting the signup function
module.exports = {signup}
