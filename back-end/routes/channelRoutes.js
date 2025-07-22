import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getChannels } from '../controllers/Channel.controller.js';


const router = express.Router();

router.get('/', protect, getChannels);

export default router;