# FOLIO

Welcome to the Folio repository! This web application provides users with personalized book recommendations based on their preferences, allows them to search for books by various criteria, and facilitates the creation of custom reading lists. The app also includes a chat bot feature for interactive book recommendations and sentiment analysis of user reviews.

Note: This was made in 24 hours for Codechef: Cook Off Hackathon

## Table of Contents

- [Basic Information](#basic-information)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributors](#contributors)

## Basic Information

This web application is designed to help users discover new books based on their preferences and interests. It leverages machine learning models for sentiment analysis and genre detection, as well as external APIs for book search functionality.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: Node.js
- **Database**: MongoDB
- **APIs**:
  - Google Books API: for book search functionality
  - Gemini AI Studio API: for chat bot integration and sentiment analysis
- **Machine Learning Models**:
  - DistilBERT-based Sentiment Analysis Model: for sentiment analysis of user reviews
  - Custom Gemini AI Studio Models: for chat bot responses and genre detection

## Installation

1. **Clone the repository:**

```git clone https://github.com/d-man1212/Folio.git```

2. **Navigate to the project directory:**

```cd Folio```

2. **Navigate to the Frontend and Backend directories:**

```cd Folio/Frontend```
```cd Folio/Backend```

4. **Install dependencies:**

```npm install```

## Usage

1. **Ensure MongoDB is running locally or provide connection details in the appropriate configuration file.**

2. **Obtain API keys for Google Books API and Gemini AI Studio API, and set them up in the environment variables or configuration files.**

3. **Start the backend server:**

```npm start```


4. **Start the frontend server:**

```npm run dev```

5. **Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the application.**

## API Endpoints

- **GET /user/:email:** Retrieves all details of a user based on their email.
- **POST /register/:email/:name:** Initializes user data in the database.
- **POST /createNewList/:email/:newlistName:** Creates a new empty list in the user's dashboard.
- **POST /addToList/:email/:listname/:bookid:** Adds a book to an existing list in the user's profile.
- **GET /search/bookname/:bookname:** Searches for books by name.
- **GET /search/bookAuthor/:authorName:** Searches for books by author.
- **GET /search/booksByGenre/:genre:** Searches for books by genre.
- **GET /bookmyUserQuery/:inputString:** Provides book recommendations based on user queries.
- **GET /analyseUserReview/:userQuery:** Analyzes user review sentiment.
- **POST /review/createReview/:bookid/:review:** Saves a review for a particular book.
- **GET /review/getReviews/:bookid:** Retrieves reviews for a specific book using the book ID.
- **GET /review/getaveragereview/:bookid:** Retrieves the average positive score for a book.
- **GET /findGenre/:description:** Retrieves the genre of a book based on its description.
- **GET /userPreferences/:email:** Retrieves the preferences of a user based on their email.
- **GET /likeBook/:email/:bookid:** Likes a book and updates the user's preferences based on the book's genre.
- **GET /unlikeBook/:email/:bookid:** Unlikes a book and removes it from the user's favorites list.
- **POST /register/:email/:name:** Initializes user data in the database. If the user already exists, it returns a 400 error with a message indicating that the user with the provided email already exists. If the user doesn't exist, it creates a new user with the provided email and name. It also initializes two default lists for the user: "To Read" and "Favorites".
- **POST /register/:email:** Initializes user data in the database. Similar to the previous endpoint but without the name parameter.
- **GET /search/bookname/:bookname:** Searches for books by name. It sends a request to the Google Books API to search for books with the provided name. It returns a maximum of 40 results.
- **GET /search/bookAuthor/:authorName:** Searches for books by author. It sends a request to the Google Books API to search for books written by the provided author. It returns a maximum of 40 results.
- **GET /search/booksByGenre/:genre:** Searches for books by genre. It sends a request to the Google Books API to search for books categorized under the provided genre. It returns a maximum of 40 results.
- **GET /search/bookById/:id:** Fetches details of a book by its ID. It sends a request to the Google Books API to fetch details of the book with the provided ID.
- **GET /user/:email:** Retrieves all details of a user based on their email. It searches for the user in the database using the provided email. If the user is found, it returns the user details with a success status of 200. If the user is not found, it returns a message indicating that the user was not found with a status of 404. If there is an error while searching for the user, it returns an error message with a status of 500.
- **GET /bookmyUserQuery/:userQuery:** Provides book recommendations based on user queries. It takes the user's query as a parameter, sends the query to a Hugging Face model using the DistilBERT architecture for sentiment analysis, and returns the model's response, which includes book recommendations. If there's an error during the process, it returns an error message with a status of 500.

For each endpoint, important information from the response JSON is provided in the documentation.

## Deployment

The backend of this application can be deployed to an AWS EC2 instance, while the frontend can be deployed to services like AWS S3 or Vercel.

1. Set up an EC2 instance on AWS.
2. SSH into your EC2 instance and clone the repository.
3. Install dependencies and start the backend server.
4. Set up MongoDB on the EC2 instance or use a cloud-based MongoDB service like MongoDB Atlas.
5. Update the frontend API endpoints in the ReactJS code to point to your EC2 instance.
6. Build the ReactJS frontend:

```npm run build```

7. Deploy the built frontend to any service providers if you want.
8. Access your deployed application via the provided URL.

## Contributors

Thanks to the following contributors for their valuable contributions to this project:

- [Gurushik (Gururock007)](https://github.com/gururock007)
- [Dharshan S (d-man1212)](https://github.com/d-man1212)
- [Surya D (surya-d007)](https://github.com/surya-d007)
- [Pragatheesh M (PragatheeshM)](https://github.com/PragatheeshM)

Feel free to check out their profiles and contributions!