import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const SecondaryButton = ({ text, location }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate(`/${location}`)}
        className="
              bg-primary cursor-pointer 
              text-secondary px-4 py-2 
              transition duration-300 
              ease-in-out hover:text-background rounded-md font-Poppins"
      >
        {text}
      </div>
    </div>
  );
};

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
