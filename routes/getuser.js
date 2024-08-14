import express from 'express';
const router = express.Router();
import {User} from "../db/models/Users.js";
import {fetchUser} from "../middleware/fetchUser.js";

router.post("/", fetchUser ,async (req,res)=>{
    try{
    const userID=req.id
    const user = await User.findById(userID).select("-password")
     res.status(200).send(user);
    } catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})
export default router
