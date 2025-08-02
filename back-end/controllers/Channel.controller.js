import ChannelModel from "../models/Channel.model.js";

/**
 * Get All Channels Controller
 * Retrieves all channels owned by the authenticated user
 * 
 * @param {Object} req - Express request object (userId should be set by auth middleware)
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user's channels or error message
 */
export const getChannels = async (req, res) => {
    try {
        // Extract user ID from request (set by authentication middleware)
        const userId = req.userId;
        
        // Find all channels owned by the current user
        const channels = await ChannelModel.find({ owner: userId });

        // Check if any channels exist for this user
        if (!channels || channels.length === 0) {
            return res.status(404).json({
                message: "There are no channels to display"
            });
        }

        // Return successful response with channels data
        res.status(200).json({ channels });

    } catch (error) {
        // Handle any server errors during channel retrieval
        console.error('Get channels error:', error);
        res.status(500).json({ 
            message: error.message 
        });
    }
};

/**
 * Create Channel Controller
 * Creates a new channel for the authenticated user
 * 
 * @param {Object} req - Express request object containing channel data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
export const createChannel = async (req, res) => {
    try {
        // Extract channel data from request body
        const { channelName, description } = req.body;
        const userId = req.userId; // User ID from authentication middleware

        // Validate required fields
        if (!channelName || !description) {
            return res.status(400).json({
                message: "Channel name and description are required"
            });
        }

        // Create new channel instance
        const newChannel = new ChannelModel({
            channelName,
            channelDescription: description,
            owner: userId,
            subscribers: 0 
        });

        // Save channel to database
        await newChannel.save();
        
        // Return success response
        res.status(201).json({
            message: "New Channel Created Successfully",
            channel: newChannel // Include created channel data
        });

    } catch (error) {
        // Handle any server errors during channel creation
        console.error('Create channel error:', error);
        res.status(500).json({ 
            message: error.message 
        });
    }
};

/**
 * Delete Channel Controller
 * Deletes a specific channel by ID (should verify ownership)
 * 
 * @param {Object} req - Express request object containing channel ID in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/error message
 */
export const deleteChannel = async (req, res) => {
    try {
        // Extract channel ID from URL parameters
        const channelId = req.params.id;
        const userId = req.userId; // User ID from authentication middleware

        // Validate channel ID
        if (!channelId) {
            return res.status(400).json({
                message: "Channel ID is required"
            });
        }

        // Find and delete channel, ensuring user owns it for security
        const deletedChannel = await ChannelModel.findOneAndDelete({
            _id: channelId,
            owner: userId // Ensure user can only delete their own channels
        });

        // Check if channel was found and deleted
        if (!deletedChannel) {
            return res.status(404).json({
                message: "Channel not found or you don't have permission to delete it"
            });
        }

        // Return success response
        res.status(200).json({
            message: "Channel deleted successfully"
        });

    } catch (error) {
        // Handle any server errors during channel deletion
        console.error('Delete channel error:', error);
        res.status(500).json({ 
            message: error.message 
        });
    }
};

/**
 * Get Single Channel Controller
 * Retrieves a specific channel by ID (public endpoint)
 * 
 * @param {Object} req - Express request object containing channel ID in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with channel data or error message
 */
export const getChannel = async (req, res) => {
    try {
        // Extract channel ID from URL parameters
        const channelId = req.params.channelId;

        // Validate channel ID
        if (!channelId) {
            return res.status(400).json({
                message: "Channel ID is required"
            });
        }

        // Find channel by ID and populate owner information if needed
        const channel = await ChannelModel.findOne({ _id: channelId })
            .populate('owner', 'username avatar'); // Optionally populate owner details

        // Check if channel exists
        if (!channel) {
            return res.status(404).json({
                message: "No Channel Found"
            });
        }

        // Return successful response with channel data
        res.status(200).json({ channel });

    } catch (error) {
        // Handle any server errors during channel retrieval
        console.error('Get channel error:', error);
        res.status(500).json({ 
            message: error.message 
        });
    }
};
