import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dark from "/images/dark.png";
import light from "/images/light.png";
import { NavButton } from "./NavButton";
import { SecondaryButton } from "./SecondaryButton";
import { useAuth } from "../contexts/AuthContext";
const Header = () => {
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div>
      <nav className="bg-background p-4">
        <div className="grid grid-cols-2 items-center">
          <a
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={isDark ? dark : light} alt="Logo" className="h-12 w-12" />
            <span className="text-text text-3xl font-bold ml-2">Folio</span>
          </a>
          <ul className=" grid grid-cols-8 gap-2">
            <li className=" col-span-2 text-center">
              <NavButton text={"Home"} location={""} />
            </li>
            {currentUser ? (
              <>
                <li className=" col-span-2 text-center">
                  <NavButton text={"Lists"} location={"lists"} />
                </li>
                <li className="col-span-2 text-center">
                  <button
                    className="
              hover:bg-secondary cursor-pointer 
              text-primary px-4 py-2 transition 
              duration-300 ease-in-out hover:text-background 
              rounded-md self-center font-Poppins"
                    onClick={() => logout()}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="col-span-4 text-center">
                <SecondaryButton text={"Login"} location={"login"} />
              </li>
            )}
            <li className=" self-center col-span-2 text-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isDark}
                  onChange={toggleTheme}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
