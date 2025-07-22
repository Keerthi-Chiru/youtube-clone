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