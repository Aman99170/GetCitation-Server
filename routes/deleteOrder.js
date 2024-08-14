import express from 'express';
const router = express.Router()
import {Order} from '../db/models/Orders.js'

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).send({ message: 'Order not found' });
        res.status(200).send({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
})
export default router