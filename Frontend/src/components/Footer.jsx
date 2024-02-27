import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start gap-8 bg-text text-background p-12 mt-4 font-Poppins">
      <div className="flex items-center gap-4 text-2xl font-semibold">
        Folio
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="text-background bg-text opacity-50 text-sub">
            GITHUB
          </div>
          <a href="https://github.com/gururock007/Folio">
            <img
              src="https://gh-card.dev/repos/gururock007/Folio.png"
              alt="Github"
              className="w-64 h-auto"
            />
          </a>
        </div>

        <div className="flex flex-col gap-2 w-1/3">
          <div className="text-background bg-text opacity-50 text-sub">
            EXPLORE
          </div>
          <div
            className="cursor-pointer text-sub hover:opacity-60"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="cursor-pointer text-sub hover:opacity-60"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </div>
          <div
            className="cursor-pointer text-sub hover:opacity-60"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </div>

        {/* Let us connect column */}
        <div className="flex flex-col gap-2 w-1/3">
          <div className="text-background bg-text opacity-50 text-sub">
            LET US CONNECT
          </div>
          <a href="https://github.com/gururock007" className="text-sub">
            Gurushik
          </a>
          <a href="https://github.com/d-man1212" className="text-sub">
            Dharshan S
          </a>
          <a href="https://github.com/surya-d007" className="text-sub">
            Surya D
          </a>
          <a href="https://github.com/PragatheeshM" className="text-sub">
            Pragatheesh M
          </a>
        </div>
      </div>
      <div className="w-full h-1 bg-background opacity-20 mt-4"></div>
      <p className="text-sub">&copy; All Rights Reserved</p>
    </div>
  );
};

export default Footer;
