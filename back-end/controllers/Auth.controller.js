import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import ChannelModel from '../models/Channel.model.js';

/**
 * User Registration Controller
 * Handles new user registration with validation, password hashing, and automatic channel creation
 * 
 * @param {Object} req - Express request object containing user registration data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const registerUser = async (req, res) => {
    try {
        // Extract user registration data from request body
        const { username, email, password } = req.body;

        // Validate required fields - ensure all necessary data is provided
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        // Check if user already exists in database to prevent duplicates
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ 
                message: "User already exists" 
            });
        }

        // Hash the password for security - never store plain text passwords
        const salt = await bcrypt.genSalt(10); // Generate salt with complexity of 10
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance with hashed password and default avatar
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            avatar: "https://www.flaticon.com/free-icon/profile_6261542?term=login+avatar&page=1&position=13&origin=tag&related_id=6261542"
        });

        // Save user to database
        await newUser.save();

        // Automatically create a personal channel for the new user
        const newChannel = new ChannelModel({
            channelName: `${newUser.username}'s channel`,
            channelDescription: "This is my personal Channel",
            owner: newUser._id,
            subscribers: 0, 
        });
        
        // Save channel to database
        await newChannel.save();

        // Send success response
        res.status(201).json({ 
            message: "User registered successfully" 
        });

    } catch (error) {
        // Handle any server errors during registration process
        console.error('Registration error:', error); // Log error for debugging
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

/**
 * User Login Controller
 * Authenticates user credentials and returns JWT token for authorized access
 * 
 * @param {Object} req - Express request object containing login credentials
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with token and user data or error message
 */
export const loginUser = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;

        // Validate required fields for login
        if (!email || !password) {
            return res.status(400).json({ 
                message: "All fields are required" 
            });
        }

        // Find user by email in database
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ // Fixed typo: was "stuatus"
                message: "User not found, please register"
            });
        }

        // Verify password by comparing with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password); // Fixed variable name: was "ismatch"
        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid credentials" 
            });
        }

        // Generate JWT token for authenticated user
        // Token expires in 1 day and contains user ID
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // Send successful login response with token and safe user data
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
                // Note: Password is intentionally excluded for security
            }
        });

    } catch (error) {
        // Handle any server errors during login process
        console.error('Login error:', error); // Log error for debugging
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};
