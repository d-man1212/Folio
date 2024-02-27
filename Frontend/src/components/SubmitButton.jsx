import PropTypes from "prop-types";
export const SubmitButton = ({ text }) => {
  return (
    <div>
      <div
        className="
              hover:bg-secondary cursor-pointer 
              text-primary px-4 py-2 transition 
              duration-300 ease-in-out hover:text-background 
              rounded-md self-center"
      >
        {text}
      </div>
    </div>
  );
};
SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
};
