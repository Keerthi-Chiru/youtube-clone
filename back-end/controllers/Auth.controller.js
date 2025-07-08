import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const userExists = await UserModel.findOne({email});
        if(userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            avatar: "https://www.flaticon.com/free-icon/profile_6261542?term=login+avatar&page=1&position=13&origin=tag&related_id=6261542"
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    }catch(error) {
        res.status(500).json({ message: "Server error", error: error.message})
    }
}


export async function loginUser(req, res) {
    try{
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.stuatus(404).json({ message: "User not found, please register"});
        }

        // check password
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    }catch(error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};