import express from 'express';
import { deleteVideo, fetchVideos, getChannelVideos, getVideo, uploadVideo, updateVideo, addLike, addDislike, getVideoWithoutIncrement, addComment, deleteComment, updateComment } from '../controllers/Video.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', protect, uploadVideo);
router.get('/', fetchVideos);
router.get('/:videoId', getVideo);
router.get('/channel/:channelId', protect, getChannelVideos)
router.delete('/:videoId', protect, deleteVideo);
router.put('/:videoId', protect, updateVideo);
router.patch('/:videoId/like', protect, addLike);
router.patch('/:videoId/dislike', protect, addDislike);
router.get('/info/:videoId', getVideoWithoutIncrement);
router.post('/:videoId/comment', protect, addComment);
router.patch('/:videoId/comment/:commentId', protect, updateComment);
router.delete('/:videoId/comment/:commentId', protect, deleteComment);


export default router;