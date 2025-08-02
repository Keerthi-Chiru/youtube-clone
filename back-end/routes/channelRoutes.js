import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createChannel, deleteChannel, getChannel, getChannels } from '../controllers/Channel.controller.js';

// Create Express router
const router = express.Router();

// Get all user channels
router.get('/', protect, getChannels);

// Create new channel
router.post('/', protect, createChannel);

// Delete channel by ID
router.delete('/:id', protect, deleteChannel);

// Get single channel by ID
router.get('/:channelId', protect, getChannel);

export default router;
