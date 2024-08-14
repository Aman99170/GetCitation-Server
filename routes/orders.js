import express from 'express';
const router = express.Router();
import {Order} from '../db/models/Orders.js'

const generateOrderNumber = ()=>{
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 10000)
    return `${timestamp}-${randomPart}`
}

router.post('/',async(req,res)=>{
    const orderNumber = generateOrderNumber()
    try{
        const existingOrderNum = await Order.findOne({orderNumber})
        // while(existingOrderNum==orderNumber){
        //     orderNumber=generateOrderNumber()
        // }
        const newOrder = new Order({
            orderNumber,
            ...req.body,
        })
        await newOrder.save()
        res.send(newOrder)
    }catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router