import express from 'express';
const router = express.Router();
import {User} from "../db/models/Users.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

router.post("/",async(req,res)=>{
  const { email, password } = req.body;
  const secretKey = process.env.secretKey;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      const authToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.status(200).send({authToken});
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
})
export default router