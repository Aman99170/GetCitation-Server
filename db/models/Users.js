import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    password: {
        type:String,
        required:true
    },
    userType: {
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema);

export { User };