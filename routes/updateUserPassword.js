import express from 'express';
const router = express.Router();
import {User} from "../db/models/Users.js";
import bcrypt from 'bcryptjs';

router.patch('/:id', async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const userID = req.params.id
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
        user.password = hashedPassword
        user.save()
        res.status(200).json({message:"Password updated successfully"})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


})

export default router