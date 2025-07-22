import ChannelModel from "../models/Channel.model.js";
import VideoModel from "../models/Video.model.js";

export async function uploadVideo(req, res){
    try{
    const {title, videoUrl, thumbnailUrl, description, category, channelName} = req.body;
    
    const channel = await ChannelModel.findOne({ channelName: channelName});

    const newVideo = new VideoModel({
        title,
        videoUrl,
        thumbnailUrl,
        description,
        channel: channel._id,
        uploader: req.userId,
        views:0,
        likes:0,
        dislikes:0,
        uploadDate: Date.now(),
        category,
    });

    const savedVideo = newVideo.save();
    channel.videos.push((await savedVideo)._id);
    await channel.save();


    res.status(201).json({message: "Video uploaded successfully"});

    }catch (err){
        res.status(500).json({error:err.message});
    }
}