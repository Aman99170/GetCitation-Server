import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.secretKey;

export const fetchUser = (req,res,next)=>{
    const authtoken = req.header("Authorization");
    const tokenObject = JSON.parse(authtoken);
    const token = tokenObject.authToken;
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token,secretKey);
        req.id=data.id;
        next();
    } catch(error){
        res.status(401).send("Invalid token")
    }
}

