import express from 'express';
const router = express.Router();
import {Order} from "../db/models/Orders.js"
import {fetchUser} from "../middleware/fetchUser.js"

router.get("/", fetchUser, async (req, res) => {
    try {
        const userID = req.id
        const searchString = req.query.search
        const sortByValue = req.query.sortBy
        const statusValue = req.query.status
        const fromDate = req.query.from
        const toDate = req.query.to
        let orders = null
        let query = {orderedBy: userID}

        if(statusValue==="In Progress"){
            query = {...query,orderStatus:statusValue}
        }
        else if(statusValue==="Success"){
            query = {...query,orderStatus:statusValue}
        }

        if(fromDate && toDate){
            query = {...query, orderedAt:{$gte: new Date(fromDate),$lte: new Date(toDate)}}
        }


        if (searchString !== undefined && searchString !== "") {
            const search = new RegExp(searchString, 'i');
            orders = await Order.find({ orderedBy: userID, $or :[{orderNumber:{$regex:search}},{paperName:{$regex:search}},{paperLink:{$regex:search}},{paperDoi:{$regex:search}}]})
        }
        else if(sortByValue!==undefined || statusValue!==undefined || (fromDate!==undefined && toDate!==undefined) ){
            if(sortByValue==="Date"){
                orders = await Order.find(query)
            }
            else if(sortByValue==="Number of Citation"){
                orders = await Order.find(query).sort({numofCitation:-1}).exec()
            }
            else if(sortByValue==="Amount"){
                orders = await Order.find(query).sort({amount:-1}).exec()
            } 
            else{
                orders = await Order.find(query)   
            }
            
        }
        else {
            orders = await Order.find({ orderedBy: userID }).sort({orderedAt:-1}).exec()
        }
        res.status(200).send(orders);
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error")
    }
})
export default router