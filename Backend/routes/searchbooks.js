const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/bookname/:bookname', async (req, res) => {
  try {
    const { bookname } = req.params;

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+${bookname}&maxResults=40`);

    res.status(response.status).send(response.data);
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to search for books',
      error: error.message
    });
  }
});



router.get('/bookAuthor/:authorName', async (req, res) => {
    try {
      const { authorName } = req.params;
  
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:+${authorName}&maxResults=40`);
  
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search for books',
        error: error.message
      });
    }
  });


  router.get('/booksByGenre/:genre', async (req, res) => {
    try {
      const { genre } = req.params;
  
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:+${genre}&maxResults=40`);
  
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search for books',
        error: error.message
      });
    }
  });



  router.get('/bookById/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);

      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch book details',
        error: error.message
      });
    }
  });

  



module.exports = router;
