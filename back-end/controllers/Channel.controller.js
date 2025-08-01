import ChannelModel from "../models/Channel.model.js"

export async function getChannels(req, res){
    try{
        const userId = req.userId;
        const channels = await ChannelModel.find({owner: userId})

        if(!channels){
            return res.status(404).json({message: "There are no channels to display"});
        }

        res.status(200).json({channels})
    } catch(error){
        res.status(500).json({message:error.message});
    }
}

export async function createChannel(req, res){
    try{
        const { channelName, description } = req.body;
        const userId = req.userId;

        const newChannel = new ChannelModel({
            channelName,
            channelDescription:description,
            owner: userId,
            subcribers:0
        })

        await newChannel.save();
        res.status(201).json({message: "New Channel Created Successfully"})
    }catch(err){
        res.status(500).json({message:err.message})

    }
}

export async function deleteChannel(req, res) {
    try{
        const channelId = req.params.id;
        await ChannelModel.findOneAndDelete({_id:channelId});
        res.status(200).json({message:"Channel deleted successfully"})
    }catch(error){
        res.status(500).json({message: error.message});
    }
    
}

export async function getChannel(req, res){
    try{
        const channelId = req.params.channelId
        const channel = await ChannelModel.findOne({_id: channelId})
        if(!channel){
            res.status(404).json({message: "No Channel Found"})
        }

        res.status(200).json({channel})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}