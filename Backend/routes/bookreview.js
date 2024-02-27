const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import Axios for making HTTP requests
const BookModel = require('../models/bookModel');

// Function to extract positive score from response
const extractPositiveScore = (response) => {
  const data = response.data[0];
  const positiveLabel = data.find(label => label.label === 'positive');
  return positiveLabel ? positiveLabel.score : 0; // Default to 0 if positive label not found
};

// API endpoint to create or update a review for a book
router.post('/createReview/:bookid/:review', async (req, res) => {
  const bookId = req.params.bookid;
  const review = req.params.review;
  let positiveScore ;
  // Fetch positive score from //analyseUserReview/:userreview endpoint
  try {
    const response =await axios.get(`/analyseUserReview/${review}`);
    positiveScore = extractPositiveScore(response);
    
  } catch (error) {
    console.error("Error fetching positive score:", error);
  }

  try {
    let book = await BookModel.findOne({ bookId });

    if (!book) {
      // If book doesn't exist, create a new one
      book = new BookModel({ bookId, reviews: [] });
    }

    // Push the new review to the reviews array
    book.reviews.push({ review, positiveScore });

    // Save the updated book object
    await book.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API endpoint to get all reviews for a book
router.get('/getReviews/:bookid', async (req, res) => {
  const bookId = req.params.bookid;

  try {
    const book = await BookModel.findOne({ bookId });

    if (!book) {
      return res.status(404).json({ message: 'No reviews Available yet' });
    }

    res.status(200).json(book.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/getaveragereview/:bookid', async (req, res) => {
  const bookId = req.params.bookid;

  try {
    const book = await BookModel.findOne({ bookId });

    if (!book || !book.reviews || book.reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews available for this book' });
    }

    let totalPositiveScore = 0;

    // Calculate the total positive score of all reviews for the book
    book.reviews.forEach(review => {
      totalPositiveScore += review.positiveScore;
    });

    // Calculate the average positive score
    const averagePositiveScore = (totalPositiveScore / book.reviews.length) * 100;
    const formattedAverage = averagePositiveScore.toFixed(1); // Limit to one decimal place

    res.status(200).json({ averagePositiveScore: formattedAverage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
