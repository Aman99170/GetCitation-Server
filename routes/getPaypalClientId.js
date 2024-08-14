import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

router.get("/",async (req,res)=>{
    try{
     res.status(200).send(process.env.PAYPAL_CLIENT_ID);
    } catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})
export default router
