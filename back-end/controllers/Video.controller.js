import ChannelModel from "../models/Channel.model.js";
import VideoModel from "../models/Video.model.js";
import mongoose from "mongoose";

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




export async function getVideo(req, res) {
  const { videoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  try {
    const video = await VideoModel.findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true }).populate('channel', 'channelName');

    if (!video) {
      return res.status(404).json({ message: "No video found" });
    }

    return res.status(200).json(video); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
  

export async function getChannelVideos(req, res){
    try{
        const channelId = req.params.channelId;
        const videos = await VideoModel.find({channel:channelId})

        if(videos.length == 0){
          return res.status(404).json({message: "No video found"})
        }
        return res.status(200).json({videos});

    }catch(error) {
      return res.status(500).json({message: error.message})
    }
}


export async function deleteVideo(req, res){
  try{
    const videoId = req.params.videoId;
    await VideoModel.findOneAndDelete({_id:videoId});
    res.status(200).json({message:"Channel deleted successfully"});

  } catch(error){
    res.status(500).json({message: error.message});
  }
}

export async function updateVideo(req, res) {
  try {
    const videoId = req.params.videoId;
    const updatedVideo = await VideoModel.findByIdAndUpdate(videoId, req.body, { new: true });
    res.status(200).json({ message: "Video updated", video: updatedVideo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function addLike(req, res) {

  try{
    const videoId = req.params.videoId;
    await VideoModel.findByIdAndUpdate(videoId,{$inc:{likes:1}}, {new:true});
    res.status(200).json({message:"Like added"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
  
}


export async function addDislike(req, res) {
  try{
    const videoId = req.params.videoId;
    await VideoModel.findByIdAndUpdate(videoId, {$inc:{dislikes:1}}, {new: true});
    res.status(200).json({message:"Dislike added"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}

export async function getVideoWithoutIncrement(req, res) {
  try {
    const { videoId } = req.params;
    const video = await VideoModel.findById(videoId).populate("channel", "channelName").populate('Comments.user', 'name');;
    if (!video) return res.status(404).json({ message: "No video found" });
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function addComment(req, res) {
  try {
    const { comment } = req.body;
    const videoId = req.params.videoId;

    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "No video Found" });
    }

    const newComment = {
      text: comment,
      user: req.userId,
      timestamp: new Date(),
    };

    video.Comments.push(newComment);
    await video.save();


    res.status(201).json({ message: "Comment added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateComment(req, res) {
  const { videoId, commentId } = req.params;
  const { updatedText } = req.body;

  const video = await VideoModel.findById(videoId);
  if (!video) return res.status(404).json({ message: "Video not found" });

  const comment = video.Comments.id(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (comment.user.toString() !== req.userId) return res.status(403).json({ message: "Unauthorized" });

  comment.text = updatedText;
  await video.save();
  res.status(200).json({ message: "Comment updated" });
}

export async function deleteComment(req, res) {
  try {
    const { videoId, commentId } = req.params;

    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.Comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }


    video.Comments.pull({ _id: commentId });

    await video.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
