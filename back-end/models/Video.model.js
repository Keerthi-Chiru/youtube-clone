
import mongoose from "mongoose";

const videoSchema =  new mongoose.Schema({
    title: String,
    videoUrl: String,
    thumbnailUrl: String,
    description: String,
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: Number,
    likes: Number,
    dislikes: Number,
    uploadDate: Date,
    category: String,
    Comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        timestamp: Date,
    }]
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
