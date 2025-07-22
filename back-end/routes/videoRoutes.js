import express from 'express';
import { uploadVideo } from '../controllers/Video.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', protect, uploadVideo);

export default router;