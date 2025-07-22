import express from "express";
import { registerUser, loginUser } from "../controllers/Auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', protect, loginUser);


export default router;
