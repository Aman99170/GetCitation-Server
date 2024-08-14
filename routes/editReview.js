import express from 'express';
const router = express.Router();
import { Review } from '../db/models/Reviews.js';

router.put('/:id', async (req, res) => {
    const orderID=req.params.id
    const { value,review } = req.body
    try {
        const updatedReview = {}
        updatedReview.ratingValue = value
        updatedReview.review = review
        const finalUpdatedReview = await Review.findOneAndUpdate({orderId:orderID},{$set:updatedReview},{new:true})
        res.status(200).json({finalUpdatedReview})
    } catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})
export default router