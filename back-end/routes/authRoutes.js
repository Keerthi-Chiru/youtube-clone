import express from "express"; // Import Express framework
import { registerUser, loginUser } from "../controllers/Auth.controller.js"; // Import authentication handlers
import { protect } from "../middlewares/authMiddleware.js"; // Import auth middleware

const router = express.Router(); // Create a new router instance

// Register a new user
router.post('/register', registerUser);

// Authenticate user and provide token
router.post('/login', loginUser);

export default router; // Export the router for use in main app
