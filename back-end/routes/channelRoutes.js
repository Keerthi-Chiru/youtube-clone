import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createChannel, deleteChannel, getChannel, getChannels } from '../controllers/Channel.controller.js';


const router = express.Router();

router.get('/', protect, getChannels);
router.post('/', protect, createChannel);
router.delete('/:id', protect, deleteChannel);
router.get('/:channelId', protect, getChannel);
export default router;