import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import {generateAccessToken,handleResponse} from './createPaypalOrder.js'
dotenv.config();
const router = express.Router()
const base = "https://api-m.sandbox.paypal.com";


  const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
  
    return handleResponse(response);
  };

router.post("/",async (req,res)=>{
    try {
        const { orderID } = req.body;
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
        res.status(httpStatusCode).json(jsonResponse);
      } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to capture order." });
      }
})
export default router