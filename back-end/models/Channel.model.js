import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: String,
    channelDescription: String,
    channelBanner: String,
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subcribers: Number,
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
});

const ChannelModel = mongoose.model('Channel', channelSchema);

export default ChannelModel;
