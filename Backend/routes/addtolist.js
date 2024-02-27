const express = require('express');
const router = express.Router();

const UserModel = require('../models/userSchema');

router.post('/:email/:listname/:bookid', async (req, res) => {
  const { email, listname, bookid } = req.params;

  try {

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const list = user.lists.find(list => list.listName === listname);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'List not found'
      });
    }

    if (list.books.includes(bookid)) {
      return res.status(400).json({
        success: false,
        message: 'Book already exists in the list'
      });
    }
    
    list.books.push(bookid);

    await user.save();

    return res.status(201).json({
      success: true,
      message: 'Book added to the list successfully',
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add book to the list',
      error: error.message
    });
  }
});

module.exports = router;
