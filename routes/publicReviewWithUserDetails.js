import express from 'express';
const router = express.Router();
import { Review } from '../db/models/Reviews.js';

router.get('/', async (req, res) => {
  try {
    const reviewWithUserDetails = await Review.aggregate([
      {
        $lookup: {
          from: 'users', // collection name in MongoDB
          localField: 'reviewedBy',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }, // Unwind the array to get an object
      {
        $sort: { ratingValue: -1 } // Sort by ratingValue in descending order
      },
      {
        $limit: 4 // Limit to top 4 results
      },
      {
        $project: {
          'userDetails.password': 0, 
          'userDetails.email': 0, 
          'userDetails._id':0,
          'userDetails.mobileNumber':0,
          'userDetails.createdAt':0,
          'userDetails.updatedAt':0,
        }
      }
    ])

    res.json(reviewWithUserDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router
