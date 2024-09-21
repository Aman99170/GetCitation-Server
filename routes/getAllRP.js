import express from 'express';
const router = express.Router();
import { Order } from '../db/models/Orders.js';

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const rowsPerpage = parseInt(req.query.rowsPerpage) || 10
    const skip = (page-1)*rowsPerpage
  try {
    const allResearchPapersWithUserDetails = await Order.aggregate([
      {
        $match: {
            numofCitation : {$gt :0}
        }
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'orderedBy',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      {
        $sort: { orderedAt: -1 } 
      },
      {
        $skip:skip
      },
      {
        $limit:rowsPerpage
      },
      {
        $project: {
          'orderStatus':0,
          'amount':0,
          'transactionStatus':0,
          'userDetails.password': 0, 
          'userDetails.email': 0, 
          'userDetails._id':0,
          'userDetails.mobileNumber':0,
          'userDetails.createdAt':0,
          'userDetails.updatedAt':0,
        }
      }
    ])

    res.json(allResearchPapersWithUserDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router
