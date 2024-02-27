const express = require('express');
const router = express.Router();
const UserModel = require('../models/userSchema');

router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        
        // Find the user by email
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // Get user's preferences
        const preferences = user.preference;
        
        // Sort preferences based on points in descending order
        preferences.sort((a, b) => b.points - a.points);
        
        // Prepare response data
        let responseData = {};
        
        if (preferences.length === 0) {
            responseData.message = "No preferences found";
        } else if (preferences.length === 1) {
            responseData.preference1 = preferences[0];
        } else {
            // If there are multiple preferences, take the top two
            responseData.preference1 = preferences[0];
            responseData.preference2 = preferences[1];
        }
        
        res.json(responseData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
