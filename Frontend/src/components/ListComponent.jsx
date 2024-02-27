import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookCard } from "./BookCard";
import noimage from "/images/no-image.jpg";
import PropTypes from "prop-types";

export const ListComponent = ({ url, gener }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setBooks(response.data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [url]);
  return (
    <div className="py-16 px-24">
      <div className="text-text font-medium p-5 text-3xl">{gener}</div>
      <div className="flex overflow-x-scroll py-14">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id}>
            <BookCard
              key={book.id}
              title={book.volumeInfo.title}
              author={
                book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Unknown Author"
              }
              liked={Math.floor(Math.random() * 100)}
              imageSrc={book.volumeInfo.imageLinks?.thumbnail || noimage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

ListComponent.propTypes = {
  url: PropTypes.string.isRequired,
  gener: PropTypes.string.isRequired,
};
