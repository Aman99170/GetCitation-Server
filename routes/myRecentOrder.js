import express from 'express';
const router = express.Router();
import {Order} from '../db/models/Orders.js'

router.get("/:id",async (req,res)=>{
    try{
    const orderID=req.params.id
    const order = await Order.findById(orderID)
     res.status(200).send(order);
    } catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})
export default router