import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=> {
    console.log(error);
})