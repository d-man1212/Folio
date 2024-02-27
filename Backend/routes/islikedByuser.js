const express = require("express");
const router = express.Router();
const axios = require("axios");
const UserModel = require("../models/userSchema"); // Assuming you have a User model

router.get("/likeit/:email/:bookid", async (req, res) => {
  try {
    const { email, bookid } = req.params;

    // Search the database for the user with the provided email
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the Favorites list of the user
    let favoritesList = user.lists.find(
      (list) => list.listName === "Favorites"
    );

    if (!favoritesList) {
      // If Favorites list not found, create one
      favoritesList = { listName: "Favorites", books: [] };
      user.lists.push(favoritesList);
    }

    // Check if the bookid exists in the Favorites list
    const isLiked = favoritesList.books.includes(bookid);

    if (!isLiked) {
      // If the book is not already liked, add it to the favorites list
      favoritesList.books.push(bookid);
      await user.save(); // Save the updated user document
    }

    // Fetch book information from Google Books API
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookid}`
    );
    const bookInfo = response.data.volumeInfo;

    // Extract description from bookInfo
    const description = bookInfo.description.replace(/\//g, "");
    // Call the findgenre endpoint of your own API to extract the genre
    const genreResponse = await axios.get(
      `http://localhost/findgenre/${description}`
    );
    const genre = genreResponse.data;

    // Update user's preference based on genre
    const existingPreference = user.preference.find((p) => p.genre === genre);
    if (existingPreference) {
      // If genre already exists, increase points by 1
      existingPreference.points += 1;
    } else {
      // If genre doesn't exist, add it to preference with points 1
      user.preference.push({ genre, points: 1 });
    }

    // Save the updated user document
    await user.save();

    res.json({ isLiked });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/unlikeit/:email/:bookid", async (req, res) => {
  try {
    const { email, bookid } = req.params;

    // Search the database for the user with the provided email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the Favorites list of the user
    const favoritesList = user.lists.find(
      (list) => list.listName === "Favorites"
    );

    if (!favoritesList) {
      return res.status(404).json({ error: "Favorites list not found" });
    }

    // Remove the bookid from the Favorites list
    favoritesList.books = favoritesList.books.filter((id) => id !== bookid);

    // Save the updated user document
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:email/:bookid", async (req, res) => {
  try {
    const { email, bookid } = req.params;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get the "Favorites" list of the user
    const favoritesList = user.lists.find(
      (list) => list.listName === "Favorites"
    );

    if (!favoritesList) {
      return res.json({ liked: false });
    }

    // Check if the provided book ID exists in the "Favorites" list
    const isLiked = favoritesList.books.includes(bookid);

    res.json({ liked: isLiked });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
