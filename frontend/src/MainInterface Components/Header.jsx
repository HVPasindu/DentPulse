import headerLogo from "../assets/headerLogo.png";
import loginicon from "../assets/loginicon.png";
import { TextAlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'

export function Header() {
  const navigate = useNavigate();

  const navigatetologinpage = () => {
    navigate("/login");
  };

  return (
    <div className=" w-screen flex justify-around items-center bg-white py-5 shadow-xl mb-0.5">
      <div className=" w-[200px] flex justify-center  items-center gap-x-2 ">
        <img src={headerLogo} className="size-10 md:size-14" />

        <h1 className="font-extrabold text-lg md:text-2xl text-cyan-300 ">
          {" "}
          Dent<span className="font-bold text-cyan-500">Pulse</span>
        </h1>
      </div>

      <div className="hidden lg:block">
        <nav className="space-x-8 cursor-pointer text-cyan-600">
          <HashLink smooth to="/#home" className="hover:text-cyan-800">
            Home
          </HashLink>
          <HashLink smooth to="/#services" className="hover:text-cyan-800">
            Services
          </HashLink>
          <HashLink smooth to="/#about" className="hover:text-cyan-800">
            Testimonials
          </HashLink>
          <HashLink smooth to="/#contact" className="hover:text-cyan-800">
            Contact
          </HashLink>
        </nav>
      </div>
      <div className="">
        <button
          className=" flex  justify-center w-[150px] border-cyan-500 border-2 rounded-lg p-2 m-2  font-light  text-black text-sm hover:text-cyan-500 hover:bg-cyan-50 "
          onClick={navigatetologinpage}
        >
          <img src={loginicon} className="w-2/12 h-2/12" />
          <span className="">Login/Signup</span>
        </button>
      </div>

      <div className="block lg:hidden">
        <TextAlignJustify />
      </div>
    </div>
  );
}
