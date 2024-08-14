import express from 'express'
const router = express.Router();
import { Review } from '../db/models/Reviews.js';

router.post('/',async(req,res)=>{
    try{
        const newReview = new Review({
            ...req.body
        })
        await newReview.save()
        res.send(newReview)
    }catch (error) {
        console.error('Error placing review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router