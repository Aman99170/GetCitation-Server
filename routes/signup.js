import express from 'express';
const router = express.Router();
import {User} from "../db/models/Users.js";
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

router.post("/",[
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('mobileNumber').isMobilePhone().withMessage('Invalid mobile number'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, mobileNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobileNumber,            
            password: hashedPassword,
        });
        await newUser.save();
        res.send(req.body)
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router