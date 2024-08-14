import express from 'express';
const router = express.Router();
import {Order} from '../db/models/Orders.js'

router.put('/:id', async (req, res) => {
    const orderID=req.params.id
    const { paperName, paperLink, paperDoi,transactionStatus } = req.body
    try {
        const updatedOrder = {}
        updatedOrder.paperName = paperName
        updatedOrder.paperLink = paperLink
        updatedOrder.paperDoi = paperDoi
        updatedOrder.transactionStatus = transactionStatus
        const finalUpdatedOrder = await Order.findByIdAndUpdate(orderID,{$set:updatedOrder},{new:true})
        res.status(200).json({finalUpdatedOrder})
    } catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})
export default router