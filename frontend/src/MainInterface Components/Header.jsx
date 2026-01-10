
import { User } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

export function Header() {
  const navigate = useNavigate();

  const navigatetologinpage = () => {
    navigate("/login");
  };


  return (
    <div className="sticky top-0 left-0 z-50 w-screen flex justify-around items-center bg-white py-5 shadow-xl mb-0.5">
      <div className=" w-[200px] flex justify-center  items-center gap-x-2 ">
        <img src="logo.png" className="size-64 md:size-14"  />

        <h1 className="font-extrabold text-3xl md:text-5xl tracking-tight text-green-600" >
          Dent<span className="font-bold text-green-700">Pulse</span>
        </h1>
      </div>

      <div className="hidden lg:block">
        <nav className="space-x-8 cursor-pointer text-2xl text-green-600">
          <HashLink smooth to="/#home" className="hover:text-cyan-800 ">
            Home
          </HashLink>
          <HashLink smooth to="/#services" className="hover:text-cyan-800 ">
            Services
          </HashLink>
          <HashLink smooth to="/#about" className="hover:text-cyan-800 ">
            Testimonials
          </HashLink>
          <HashLink smooth to="/#contact" className="hover:text-cyan-800 ">
            Contact
          </HashLink>
        </nav>
      </div>
      <div className="">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex justify-center w-[300px] border-green-500 border-2 
                   rounded-lg p-2 m-2 font-light text-black text-sm 
                   hover:text-green-500 hover:bg-green-100"
          onClick={navigatetologinpage}
        >
          <div className="flex flex-row items-center gap-x-2 p-0.5">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <User className="text-green-800" />
            </motion.div>

            {/* Text */}
            <h1 className="text-green-700 text-xl font-semibold">Login</h1>
          </div>
        </motion.button>
      </div>

      <div className="block lg:hidden">
        <TextAlignJustify />
      </div>
    </div>
  );
}
