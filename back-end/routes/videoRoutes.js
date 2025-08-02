import express from 'express';
import { 
    deleteVideo, 
    fetchVideos, 
    getChannelVideos, 
    getVideo, 
    uploadVideo, 
    updateVideo, 
    addLike, 
    addDislike, 
    getVideoWithoutIncrement, 
    addComment, 
    deleteComment, 
    updateComment 
} from '../controllers/Video.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

// Create Express router
const router = express.Router();

// Upload new video
router.post('/upload', protect, uploadVideo);

// Get all videos
router.get('/', fetchVideos);

// Get single video by ID (increments view count)
router.get('/:videoId', getVideo);

// Get videos by channel ID
router.get('/channel/:channelId', protect, getChannelVideos);

// Delete video by ID
router.delete('/:videoId', protect, deleteVideo);

// Update video by ID
router.put('/:videoId', protect, updateVideo);

// Add like to video
router.patch('/:videoId/like', protect, addLike);

// Add dislike to video
router.patch('/:videoId/dislike', protect, addDislike);

// Get video info without incrementing views
router.get('/info/:videoId', getVideoWithoutIncrement);

// Add comment to video
router.post('/:videoId/comment', protect, addComment);

// Update comment
router.patch('/:videoId/comment/:commentId', protect, updateComment);

// Delete comment
router.delete('/:videoId/comment/:commentId', protect, deleteComment);

export default router;
