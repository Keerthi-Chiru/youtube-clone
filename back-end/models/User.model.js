import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }]

});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
// This code defines a Mongoose schema for a User model in a MongoDB database.