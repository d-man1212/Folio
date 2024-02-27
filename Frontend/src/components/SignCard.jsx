import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail, validatePassword } from "../contexts/regexConditions";
import sign from "/images/sign.png";
import eyeIcon from "/images/eye.png";
import eyeClosedIcon from "/images/eye-closed.png";

export const SignCard = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      } else if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one symbol, one lowercase letter, and one number."
        );
        return;
      } else if (password !== confirmPassword) {
        setError("Please make sure the passwords match.");
        return;
      }

      await signup(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-32 py-16 font-Poppins">
      <div className="grid grid-cols-5 bg-opacity-10 shadow-md shadow-secondary p-6 pt-16 rounded-3xl">
        <div className="col-span-3">
          <img src={sign} alt="Illustration" className="w-full h-auto" />
        </div>
        <div className="px-8 col-span-2">
          <h2 className="text-3xl font-bold text-text mb-8 text-center">
            Sign Up
          </h2>
          {error && (
            <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 mb-4 rounded-md bg-inputfeild placeholder:text-text text-text"
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 mb-4 rounded-md bg-inputfeild placeholder:text-text text-text"
          />
          <div className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <img
                src={eyeClosedIcon}
                alt="Hide"
                className="absolute -right-0 -translate-y-[3.3rem] -translate-x-20 transform cursor-pointer"
              />
            ) : (
              <img
                src={eyeIcon}
                alt="Show"
                className="absolute -right-0 -translate-y-[3.3rem] -translate-x-20 transform cursor-pointer"
              />
            )}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full p-3 mb-4 rounded-md bg-inputfeild placeholder:text-text text-text"
          />
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1 self-center text-center mt-4">
              <button
                className="hover:bg-secondary cursor-pointer 
              text-primary w-full px-3 py-3 transition
              duration-300 ease-in-out hover:text-background 
              rounded-md self-center border border-accent"
                onClick={handleSignUp}
              >
                Sign Up{" "}
              </button>
            </div>
            <div className="col-span-1">
              <button className="bg-inputfeild text-text p-3 rounded-md mt-4 w-full">
                Sign Up with Gmail
              </button>
            </div>
          </div>
          <div className="text-text mt-4 text-center pt-5">
            Already have an account?{" "}
            <a href="/login" className="underline text-accent">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
