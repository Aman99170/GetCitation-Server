import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import connectDB from './db/config.js';
import dotenv from 'dotenv';
import signUp from "./routes/signup.js";
import login from "./routes/login.js";
import getUser from "./routes/getuser.js";
import updateUserDetails from "./routes/updateUserDetails.js";
import updateUserPassword from "./routes/updateUserPassword.js";
import orders from "./routes/orders.js";
import myOrders from "./routes/myorders.js";
import updateOrder from "./routes/updateOrder.js";
import deleteOrder from "./routes/deleteOrder.js";
import myRecentOrder from "./routes/myRecentOrder.js";
import getPaypalClientId from "./routes/getPaypalClientId.js";
import createPaypalOrder from "./routes/createPaypalOrder.js";
import capturePaypalOrder from "./routes/capturePaypalOrder.js";
import review from "./routes/review.js";
import myReview from "./routes/myReviewForAOrder.js"
import editReview from "./routes/editReview.js"
import reviewWithUserDetails from "./routes/reviewWithUserDetails.js"
import publicReviewWithUserDetails from "./routes/publicReviewWithUserDetails.js"
import allResearchPapers from "./routes/getAllRP.js"

const app = express()
app.use(express.json())
// for prod
// app.use(cors({
//   origin: 'http://localhost:3000/', // Replace with your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 204
// }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
//   // res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
// Handle OPTIONS requests for preflight CORS requests
// app.options('*', cors());
// for dev
app.use(cors())
connectDB();
dotenv.config();
const port = process.env.port

app.use('/signup',signUp)
app.use('/login',login)
app.use('/getUser',getUser)
app.use('/updateUserDetails',updateUserDetails)
app.use('/updateUserPassword',updateUserPassword)
app.use('/order',orders)
app.use('/myOrders',myOrders)
app.use('/updateOrder',updateOrder)
app.use('/deleteOrder',deleteOrder)
app.use('/myRecentOrder',myRecentOrder)
app.use('/getPaypalClientId',getPaypalClientId)
app.use('/my-server/create-paypal-order',createPaypalOrder)
app.use('/my-server/capture-paypal-order',capturePaypalOrder)
app.use('/review',review)
app.use('/myReviewForAOrder',myReview)
app.use('/editReview',editReview)
app.use('/fetchReviewWithUserDetails',reviewWithUserDetails)
app.use('/fetchPublicReviewWithUserDetails',publicReviewWithUserDetails)
app.use('/getAllRP',allResearchPapers)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// export const handler = serverless(app);