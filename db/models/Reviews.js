import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    ratingValue:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    reviewedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    reviewedAt:{
        type:Date,
        default: Date.now
    },
})

const Review = mongoose.model('Review', reviewSchema);

export { Review };