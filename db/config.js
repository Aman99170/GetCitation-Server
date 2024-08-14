import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://getcitationsrp:Qwerty%21%40%23%24%25@cluster0.wcfip5f.mongodb.net/?retryWrites=true&w=majority`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
export default connectDB