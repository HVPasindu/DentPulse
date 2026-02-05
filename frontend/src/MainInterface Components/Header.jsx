import { User } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import { useState } from "react";

export function Header() {
  const [helpOpen, setHelpOpen] = useState(false);

  const openNewWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setHelpOpen(false);
  };

  const navigate = useNavigate();

  const navigatetologinpage = () => {
    navigate("/login");
  };

  const navigatetohome = () => {
    navigate("/");
  };
  return (
    <div className="sticky top-0 left-0 z-50 w-screen flex justify-around items-center bg-white py-5 shadow-xl mb-0.5">
      <div className=" w-[200px] flex justify-center  items-center gap-x-2 ">
        <img
          src="logo.png"
          className="size-14 md:size-14 hover:cursor-pointer"
          onClick={navigatetohome}
        />

        <h1 className="font-extrabold text-3xl md:text-5xl tracking-tight text-green-600">
          Dent<span className="font-bold text-green-700">Pulse</span>
        </h1>
      </div>

      <div className="hidden lg:block">
        <nav className="space-x-8 cursor-pointer text-xl text-green-600">
          <HashLink smooth to="/#home" className="hover:text-green-800 ">
            Home
          </HashLink>
          <HashLink smooth to="/#services" className="hover:text-green-800 ">
            Services
          </HashLink>
          <HashLink smooth to="/#about" className="hover:text-green-800 ">
            Testimonials
          </HashLink>
          <HashLink smooth to="/#contact" className="hover:text-green-800 ">
            Contact
          </HashLink>
          <div className="relative inline-block">
  <button
    onClick={() => setHelpOpen(!helpOpen)}
    className="hover:text-green-800 focus:outline-none"
  >
    Help
  </button>

  {helpOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute top-10 right-0 bg-white border border-green-200 rounded-xl shadow-lg w-56 z-50"
    >
     <ul className="flex flex-col py-2 text-green-700 text-base">
  {[
    { label: "A Toothache", link: "/help/toothache" },
    { label: "A Cavity", link: "/help/cavity" },
    { label: "A Broken Tooth", link: "/help/broken-tooth" },
    { label: "A Missing Tooth", link: "/help/missing-tooth" },
    { label: "Discoloured Teeth", link: "/help/discoloured-teeth" },
    { label: "Sensitive Teeth", link: "/help/sensitive-teeth" },
    { label: "Bleeding Gums", link: "/help/bleeding-gums" },
    { label: "Tooth Mobility", link: "/help/tooth-mobility" },
    { label: "Receding Gum", link: "/help/receding-gum" },
    { label: "Bad Breath", link: "/help/bad-breath" },
    { label: "Wisdom Teeth", link: "/help/wisdom-teeth" },
  ].map((item) => (
    <li
      key={item.label}
      className="px-4 py-2 hover:bg-green-100 cursor-pointer transition"
      onClick={() => openNewWindow(item.link)}
    >
      {item.label}
    </li>
  ))}
</ul>

    </motion.div>
  )}
</div>

        </nav>
      </div>
      <div className="">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex justify-center min-w-[120px] md:min-w-[140px] border-green-500 border-2 
                   rounded-lg p-2 m-2 font-light text-black text-sm 
                   hover:text-green-500 hover:bg-green-100 hover:cursor-pointer"
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
