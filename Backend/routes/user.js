const express = require('express');
const router = express.Router();

const UserModel = require('../models/userSchema');


router.get('/:email', (req, res) => {
  
  const { email } = req.params;

  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
      
        res.status(200).json({
          success: true,
          user: user
        });
      } else {
    
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: 'Failed to find user',
        error: error.message
      });
    });
});

module.exports = router;
