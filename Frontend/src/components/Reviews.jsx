import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const Reviews = ({ slug, reviews }) => {
  const [newReview, setNewReview] = useState("");
  const [updatedReviews, setUpdatedReviews] = useState(reviews);

  const handleReviewSubmit = async () => {
    try {
      const bookId = slug;
      console.log(bookId, newReview);
      await axios.post(
        `http://localhost/review/createReview/${bookId}/${newReview}`
      );
      ``;
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="m-4 p-12 pb-0">
      <div className="text-text">
        <div className="pb-10">
          <div className="font-medium text-3xl text-center underline">
            Reviews
          </div>
        </div>

        {updatedReviews.length > 0 ? (
          updatedReviews.map((review) => (
            <div key={review._id} className="border-b py-4 px-20">
              {review.review}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No reviews available. Be the first to write a review!
          </div>
        )}
      </div>
      <div className="py-16 container mx-auto">
        <label
          htmlFor="message"
          className="pb-10 font-medium text-text self-center text-3xl"
        >
          <div className="pb-4 text-3xl text-center">Write a Review</div>
        </label>
        <textarea
          id="message"
          rows="4"
          className="mt-10 p-5 w-full text-sm text-text bg-inputfeild rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button
          className="px-10 py-3 mt-10 self-center bg-primary rounded-xl"
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

Reviews.propTypes = {
  slug: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
};
