import ChannelModel from "../models/Channel.model.js";
import VideoModel from "../models/Video.model.js";
import mongoose from "mongoose";

/**
 * Upload Video Controller
 * Handles video upload with metadata and links it to a channel
 * 
 * @param {Object} req - Express request object containing video data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const uploadVideo = async (req, res) => {
    try {
        // Extract video data from request body
        const { title, videoUrl, thumbnailUrl, description, category, channelName } = req.body;
        
        // Validate required fields
        if (!title || !videoUrl || !channelName) {
            return res.status(400).json({
                message: "Title, video URL, and channel name are required"
            });
        }

        // Find the channel by name
        const channel = await ChannelModel.findOne({ channelName: channelName });
        
        // Check if channel exists
        if (!channel) {
            return res.status(404).json({
                message: "Channel not found"
            });
        }

        // Verify that the user owns the channel
        if (channel.owner.toString() !== req.userId) {
            return res.status(403).json({
                message: "Unauthorized: You can only upload videos to your own channel"
            });
        }

        // Create new video instance
        const newVideo = new VideoModel({
            title,
            videoUrl,
            thumbnailUrl,
            description,
            channel: channel._id,
            uploader: req.userId,
            views: 0,
            likes: 0,
            dislikes: 0,
            uploadDate: new Date(), // Use new Date() instead of Date.now()
            category,
        });

        // Save video to database
        const savedVideo = await newVideo.save(); // Fixed: await the save operation
        
        // Add video to channel's video list
        channel.videos.push(savedVideo._id);
        await channel.save();

        // Return success response with video data
        res.status(201).json({
            message: "Video uploaded successfully",
            video: savedVideo
        });

    } catch (error) {
        // Handle any server errors during video upload
        console.error('Upload video error:', error);
        res.status(500).json({
            error: error.message
        });
    }
};

/**
 * Fetch All Videos Controller
 * Retrieves all videos from the database with channel information
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with videos array or error message
 */
export const fetchVideos = async (req, res) => {
    try {
        // Find all videos and populate channel information
        const videos = await VideoModel.find()
            .populate('channel', 'channelName')
            .populate('uploader', 'username')
            .sort({ uploadDate: -1 }); // Sort by newest first

        // Check if any videos exist
        if (!videos || videos.length === 0) {
            return res.status(404).json({
                message: "No videos found"
            });
        }

        // Return successful response with videos
        res.status(200).json({ videos });

    } catch (error) {
        // Handle any server errors during video retrieval
        console.error('Fetch videos error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Get Single Video Controller
 * Retrieves a specific video by ID and increments view count
 * 
 * @param {Object} req - Express request object containing video ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with video data or error message
 */
export const getVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Find video by ID, increment views, and populate channel info
        const video = await VideoModel.findByIdAndUpdate(
            videoId,
            { $inc: { views: 1 } }, // Increment view count
            { new: true }
        ).populate('channel', 'channelName')
         .populate('uploader', 'username');

        // Check if video exists
        if (!video) {
            return res.status(404).json({
                message: "No video found"
            });
        }

        // Return successful response with video data
        return res.status(200).json(video);

    } catch (error) {
        // Handle any server errors during video retrieval
        console.error('Get video error:', error);
        return res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Get Channel Videos Controller
 * Retrieves all videos belonging to a specific channel
 * 
 * @param {Object} req - Express request object containing channel ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with channel videos or error message
 */
export const getChannelVideos = async (req, res) => {
    try {
        const { channelId } = req.params;

        // Validate channel ID format
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({
                message: "Invalid channel ID"
            });
        }

        // Find all videos for the specific channel
        const videos = await VideoModel.find({ channel: channelId })
            .populate('channel', 'channelName')
            .sort({ uploadDate: -1 }); // Sort by newest first

        // Check if any videos exist for this channel
        if (videos.length === 0) {
            return res.status(404).json({
                message: "No videos found for this channel"
            });
        }

        // Return successful response with videos
        return res.status(200).json({ videos });

    } catch (error) {
        // Handle any server errors during video retrieval
        console.error('Get channel videos error:', error);
        return res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Delete Video Controller
 * Deletes a specific video (with ownership verification)
 * 
 * @param {Object} req - Express request object containing video ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const deleteVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.userId;

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Find and delete video, ensuring user owns it
        const deletedVideo = await VideoModel.findOneAndDelete({
            _id: videoId,
            uploader: userId // Ensure user can only delete their own videos
        });

        // Check if video was found and deleted
        if (!deletedVideo) {
            return res.status(404).json({
                message: "Video not found or you don't have permission to delete it"
            });
        }

        // Remove video from channel's video list
        await ChannelModel.updateOne(
            { _id: deletedVideo.channel },
            { $pull: { videos: videoId } }
        );

        // Return success response
        res.status(200).json({
            message: "Video deleted successfully" // Fixed: was "Channel deleted successfully"
        });

    } catch (error) {
        // Handle any server errors during video deletion
        console.error('Delete video error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Update Video Controller
 * Updates video metadata (with ownership verification)
 * 
 * @param {Object} req - Express request object containing video ID and update data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated video or error message
 */
export const updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.userId;

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Check if video exists and user owns it
        const existingVideo = await VideoModel.findOne({
            _id: videoId,
            uploader: userId
        });

        if (!existingVideo) {
            return res.status(404).json({
                message: "Video not found or you don't have permission to update it"
            });
        }

        // Update video with new data
        const updatedVideo = await VideoModel.findByIdAndUpdate(
            videoId,
            req.body,
            { new: true }
        ).populate('channel', 'channelName');

        // Return success response with updated video
        res.status(200).json({
            message: "Video updated successfully",
            video: updatedVideo
        });

    } catch (error) {
        // Handle any server errors during video update
        console.error('Update video error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Add Like Controller
 * Increments the like count for a specific video
 * 
 * @param {Object} req - Express request object containing video ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const addLike = async (req, res) => {
    try {
        const { videoId } = req.params;

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Increment like count
        const updatedVideo = await VideoModel.findByIdAndUpdate(
            videoId,
            { $inc: { likes: 1 } },
            { new: true }
        );

        // Check if video exists
        if (!updatedVideo) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        // Return success response
        res.status(200).json({
            message: "Like added successfully",
            likes: updatedVideo.likes
        });

    } catch (error) {
        // Handle any server errors during like addition
        console.error('Add like error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Add Dislike Controller
 * Increments the dislike count for a specific video
 * 
 * @param {Object} req - Express request object containing video ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const addDislike = async (req, res) => {
    try {
        const { videoId } = req.params;

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Increment dislike count
        const updatedVideo = await VideoModel.findByIdAndUpdate(
            videoId,
            { $inc: { dislikes: 1 } },
            { new: true }
        );

        // Check if video exists
        if (!updatedVideo) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        // Return success response
        res.status(200).json({
            message: "Dislike added successfully",
            dislikes: updatedVideo.dislikes
        });

    } catch (error) {
        // Handle any server errors during dislike addition
        console.error('Add dislike error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Get Video Without Increment Controller
 * Retrieves video data without incrementing view count (for editing/admin purposes)
 * 
 * @param {Object} req - Express request object containing video ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with video data or error message
 */
export const getVideoWithoutIncrement = async (req, res) => {
    try {
        const { videoId } = req.params;

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Find video without incrementing views
        const video = await VideoModel.findById(videoId)
            .populate("channel", "channelName")
            .populate('Comments.user', 'username'); // Fixed: should be 'username' not 'name'

        // Check if video exists
        if (!video) {
            return res.status(404).json({
                message: "No video found"
            });
        }

        // Return successful response with video data
        res.status(200).json(video);

    } catch (error) {
        // Handle any server errors during video retrieval
        console.error('Get video without increment error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Add Comment Controller
 * Adds a new comment to a specific video
 * 
 * @param {Object} req - Express request object containing comment data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { videoId } = req.params;

        // Validate required fields
        if (!comment || comment.trim() === '') {
            return res.status(400).json({
                message: "Comment text is required"
            });
        }

        // Validate video ID format
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({
                message: "Invalid video ID"
            });
        }

        // Find the video
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        // Create new comment object
        const newComment = {
            text: comment.trim(),
            user: req.userId,
            timestamp: new Date(),
        };

        // Add comment to video
        video.Comments.push(newComment);
        await video.save();

        // Return success response
        res.status(201).json({
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (error) {
        // Handle any server errors during comment addition
        console.error('Add comment error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Update Comment Controller
 * Updates an existing comment (with ownership verification)
 * 
 * @param {Object} req - Express request object containing comment update data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const updateComment = async (req, res) => {
    try {
        const { videoId, commentId } = req.params;
        const { updatedText } = req.body;

        // Validate required fields
        if (!updatedText || updatedText.trim() === '') {
            return res.status(400).json({
                message: "Updated comment text is required"
            });
        }

        // Validate IDs format
        if (!mongoose.Types.ObjectId.isValid(videoId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid video ID or comment ID"
            });
        }

        // Find video
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        // Find specific comment
        const comment = video.Comments.id(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Verify ownership
        if (comment.user.toString() !== req.userId) {
            return res.status(403).json({
                message: "Unauthorized: You can only update your own comments"
            });
        }

        // Update comment text
        comment.text = updatedText.trim();
        await video.save();

        // Return success response
        res.status(200).json({
            message: "Comment updated successfully"
        });

    } catch (error) {
        // Handle any server errors during comment update
        console.error('Update comment error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * Delete Comment Controller
 * Deletes a specific comment (with ownership verification)
 * 
 * @param {Object} req - Express request object containing video and comment IDs
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const deleteComment = async (req, res) => {
    try {
        const { videoId, commentId } = req.params;

        // Validate IDs format
        if (!mongoose.Types.ObjectId.isValid(videoId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid video ID or comment ID"
            });
        }

        // Find video
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({
                message: "Video not found"
            });
        }

        // Find specific comment
        const comment = video.Comments.id(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Verify ownership
        if (comment.user.toString() !== req.userId) {
            return res.status(403).json({
                message: "Unauthorized: You can only delete your own comments"
            });
        }

        // Remove comment from video
        video.Comments.pull({ _id: commentId });
        await video.save();

        // Return success response
        res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        // Handle any server errors during comment deletion
        console.error('Delete comment error:', error);
        res.status(500).json({
            message: error.message
        });
    }
};
