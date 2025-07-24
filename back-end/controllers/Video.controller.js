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


export async function fetchVideos(req, res) {
    try{

    const videos = await VideoModel.find().populate('channel', 'channelName');

    if(!videos){
        return res.status(404).json({message: "No videos Found"})
    }

    res.status(200).json({videos});
}catch(error){
    res.status(500).json({message: error.message})
}
}