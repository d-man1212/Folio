const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  reviews: [{
    review: {
      type: String,
    },
    positiveScore: {
      type: Number,
    }
  }]
});

const bookModel = mongoose.model('Bookdata', bookSchema);

module.exports = bookModel;
