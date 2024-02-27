const express = require('express');
const router = express.Router();


const userModel = require('../models/userSchema');

router.post('/:email/:name', (req, res) => {
  
  const { email, name } = req.params;

  userModel.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      } else {
        
        const newUser = new userModel({
          email: email,
          name: name,
          lists: [
            {
              listName : "To Read"
            },
            {
              listName : "Favorites"
            }
          ] 
        });

        
        newUser.save()
          .then(savedUser => {
            
            res.status(201).json({
              success: true,
              message: 'User saved successfully',
              user: savedUser
            });
          })
          .catch(error => {
            res.status(500).json({
              success: false,
              message: 'Failed to save user',
              error: error.message
            });
          });
      }
    })
});


router.post('/:email', (req, res) => {
  
  const { email } = req.params;

  userModel.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      } else {
        
        const newUser = new userModel({
          email: email,
          lists: [
            {
              listName : "To Read"
            },
            {
              listName : "Favorites"
            }
          ] 
        });

        
        newUser.save()
          .then(savedUser => {
            
            res.status(201).json({
              success: true,
              message: 'User saved successfully',
              user: savedUser
            });
          })
          .catch(error => {
            res.status(500).json({
              success: false,
              message: 'Failed to save user',
              error: error.message
            });
          });
      }
    })
});

module.exports = router;
