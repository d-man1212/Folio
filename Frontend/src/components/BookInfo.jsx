import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import heart_outline from "/images/heart-outline.png";
import heart_outline_white from "/images/heart-outline-white.png";
import heart from "/images/heart.png";
import noimage from "/images/no-image.jpg";
import { useAuth } from "../contexts/AuthContext";

export const BookInfo = ({ book }) => {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [averageRating, setAverageRating] = useState(null);
  const removeHtmlTags = (html) => {
    if (html === undefined) {
      return "";
    }
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost/likedbyUser/${currentUser.email}/${book.id}`
        );
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error("Error checking liked status:", error);
      }
    };

    checkLikedStatus();
  }, [book.id, currentUser.email]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `http://localhost/review/getaveragereview/${book.id}`
        );
        const data = await response.json();
        setAverageRating(data.averagePositiveScore);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };
    fetchAverageRating();
  }, [book.id]);

  const changeLikeHandle = async () => {
    try {
      setLiked((prevVal) => !prevVal);
      const action = liked ? "unlikeit" : "likeit";
      await fetch(
        `http://localhost/likedbyUser/${action}/${currentUser.email}/${book.id}`,
        {
          method: "GET",
        }
      );
      console.log("Like status updated successfully");
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div className="m-4 border-b-4 border-secondary p-12">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-10">
        <div className="col-span-1 lg:col-span-6">
          <div className="text-4xl font-semibold mb-4 underline">
            {book?.volumeInfo.title || "No title available"}
          </div>
          <div className="text-xl font-semibold">
            by{" "}
            {book?.volumeInfo.authors
              ? book?.volumeInfo.authors.join(", ")
              : "Unknown Author"}
          </div>
          <div className="mt-5">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                Ratings: {averageRating || "No reviews yet"}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-5">
              <div className="w-10">
                <button
                  className={`flex items-center space-x-2 ${
                    liked ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={changeLikeHandle}
                >
                  {liked ? (
                    <img src={heart} alt="Liked" className="w-6 h-6" />
                  ) : isDark ? (
                    <img
                      src={heart_outline_white}
                      alt="Like"
                      className="w-6 h-6"
                    />
                  ) : (
                    <img src={heart_outline} alt="Like" className="w-6 h-6" />
                  )}
                  <span>{liked ? "Liked" : "Like"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || noimage}
            alt={book?.volumeInfo.title || "No title available"}
            className=" w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="mt-10 text-lg font-semibold">Description</div>
      <div className="text-justify">
        {removeHtmlTags(book?.volumeInfo.description) ||
          "No description available"}
      </div>
    </div>
  );
};

BookInfo.propTypes = {
  book: PropTypes.object.isRequired,
};
