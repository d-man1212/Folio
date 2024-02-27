const express = require('express');
const router = express.Router();

const UserModel = require('../models/userSchema');

router.post('/:email/:newlistName', async (req, res) => {
  const { email, newlistName } = req.params;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const existingList = user.lists.find(list => list.listName === newlistName);

    if (existingList) {
      return res.status(400).json({
        success: false,
        message: 'List with this name already exists for the user'
      });
    }

    user.lists.push({ listName: newlistName, books: [] });

    await user.save();

    return res.status(201).json({
      success: true,
      message: 'New list created successfully',
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create new list',
      error: error.message
    });
  }
});

module.exports = router;
