import express from 'express';
const router = express.Router();
import {User} from "../db/models/Users.js";
import bcrypt from 'bcryptjs';
import { fetchUser } from '../middleware/fetchUser.js';

router.patch('/:id', fetchUser,async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const userID = req.id
    try {
        const user = await User.findById(userID)
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid old password' })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUser = {}
        updatedUser.password = hashedPassword
        const finalUpdatedUser = await User.findByIdAndUpdate(userID,{$set:updatedUser})
        if(finalUpdatedUser){
            res.status(200).json({message:"Password updated successfully"})
        }
        else{
        res.status(400).json({message:"Bad Request"})
        }
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


})

export default router