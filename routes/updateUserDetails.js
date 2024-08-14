import express from 'express';
const router = express.Router();
import {User} from "../db/models/Users.js";

router.put('/:id', async (req, res) => {
    const { firstName, lastName, email, mobileNumber } = req.body
    const userID = req.params.id
    try {
        const user = await User.findById(userID).select("-password")
        if (!user) {
            return res.status(404).json({ message: "No user found" })
        }
        const updatedUser = {}
        updatedUser.firstName = firstName
        updatedUser.lastName = lastName
        updatedUser.email = email
        updatedUser.mobileNumber = mobileNumber
        const finalUpdatedUser = await User.findByIdAndUpdate(userID,{$set:updatedUser})
        res.status(200).json({finalUpdatedUser})
    } catch(error){
        console.error(error)
        res.status(500).send("Internal server error") 
    }
})
export default router