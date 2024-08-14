import express from 'express'
const router = express.Router();
import { Review } from '../db/models/Reviews.js';

router.get('/:id',async (req,res)=>{
    const orderID=req.params.id
    try{
        const review = await Review.findOne({orderId:orderID})
        res.status(200).send(review)
    }catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})

export default router;