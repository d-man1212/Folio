import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginimg from "/images/login.png";
import eyeIcon from "/images/eye.png";
import eyeClosedIcon from "/images/eye-closed.png";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail } from "../contexts/regexConditions";
export const LoginCard = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginWithGoogle = async (event) => {
    event.preventDefault();
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" px-32 py-16 font-Poppins">
      <div className="grid grid-cols-5  bg-opacity-10 shadow-md shadow-secondary p-6 pt-16 rounded-3xl">
        <div className=" col-span-3">
          <img src={loginimg} alt="Illustration" className=" w-2/3 h-auto" />
        </div>
        <div className="px-8 col-span-2">
          <h2 className="text-3xl font-bold text-text mb-8 text-center">
            Login
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
                className="absolute -right-0 -translate-y-[3.3rem] -translate-x-52 transform cursor-pointer"
              />
            ) : (
              <img
                src={eyeIcon}
                alt="Show"
                className="absolute -right-0 -translate-y-[3.3rem] -translate-x-52 transform cursor-pointer"
              />
            )}
          </div>
          <div className=" grid grid-cols-2 gap-5">
            <div className=" col-span-1 self-center text-center mt-4">
              <button
                className="hover:bg-secondary cursor-pointer 
              text-primary w-full px-3 py-3 transition 
              duration-300 ease-in-out hover:text-background 
              rounded-md self-center border border-accent"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className=" col-span-1">
              <button
                className=" bg-inputfeild text-text p-3 rounded-md mt-4 w-full "
                onClick={handleLoginWithGoogle}
              >
                Sign Up with Gmail
              </button>
            </div>
          </div>
          <div className="text-text mt-4 text-center pt-5">
            Do not have an account?{" "}
            <a href="/signup" className="underline text-accent">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
