import express from 'express';
import { fetchVideos, uploadVideo } from '../controllers/Video.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', protect, uploadVideo);
router.get('/', fetchVideos);

export default router;