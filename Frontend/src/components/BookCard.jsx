import PropTypes from "prop-types";

export const BookCard = ({ title, author, liked, imageSrc, onClick }) => {
  return (
    <div>
      <div
        className={`group relative w-48 h-64 rounded-lg transition duration-200 ease-in-out hover:shadow-md hover:scale-110 hover:-translate-y-6 overflow-hidden`}
      >
        <div
          className={`absolute right-0 top-0 w-12 h-12 rounded-full z-10 flex items-center justify-center bg-secondary`}
        >
          <div className="text-center text-text font-semibold">{liked}%</div>
        </div>
        <div className="p-4">
          <div className="grid place-items-center h-full w-full">
            <img
              src={imageSrc}
              className=" w-48 h-64 rounded-xl p-2 object-cover"
              alt=""
            />
          </div>
        </div>
        <button
          className={`
            absolute bg-gradient-to-b from-black/10 via-black/70 to-black/100 bottom-0
            left-1/2 transform -translate-x-1/2
            -translate-y-0 text-white w-40 h-60
            px-4 py-2 rounded-lg border-none transition 
            duration-300 ease-in-out opacity-0 font-medium font-Poppins
            group-hover:opacity-100`}
          onClick={onClick}
        >
          <div className="mt-16">{title}</div>
          <div>{author}</div>
        </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  liked: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
