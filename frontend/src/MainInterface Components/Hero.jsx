import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar, Phone } from "lucide-react";
import { motion } from "framer-motion";
export function Hero() {
  const navigate = useNavigate();

  const switchlologin = () => {
    navigate("/login");
  };

  return (
    <div
      className="relative bg-cover bg-center overflow-x-hidden min-h-[75vh]"
      style={{ backgroundImage: "url('/lady.jpeg')", backgroundPosition:'right', }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-linear-to-t from-black/40 via-black/5 to-transparent"></div>

      {/* CONTENT */}
      <div className="relative z-10 px-12 py-10 ">
        {/* TEXT SECTION */}
        <div className="flex flex-col items-start">
          <h1 className="text-white rounded-3xl bg-green-700 my-6 py-1.5 px-4">
            🌟 Trusted by 100000+ Happy Patients
          </h1>
          <div className="w-16 h-1 bg-green-600 mb-3 rounded-full"></div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-extrabold text-5xl md:text-6xl tracking-tight leading-tight text-green-800 mt-4"
          >
            Your Smile,{" "}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-green-600"
            >
              Our Priority
            </motion.span>
          </motion.h1>

          <div className="w-full md:w-[50%] mt-4">
            <p className="text-lg md:text-xl text-gray-800 font-normal leading-relaxed text-left mt-4">
              Experience exceptional dental care with our team of experienced
              professionals. We're committed to providing comfortable,
              high-quality treatment for the whole family.
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-start items-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-xl bg-green-600 text-white px-10 py-6 hover:bg-green-700"
            onClick={switchlologin}
          >
            <div className="flex items-center gap-2">
              <Calendar />
              <span className="font-semibold">Book Appointment</span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-lg bg-white border-green-600 border-2 px-10 py-6 hover:bg-green-200"
          >
            <div className="flex items-center gap-2">
              <Phone />
              <span className="font-semibold">Contact Us</span>
            </div>
          </motion.button>
        </div>

        {/* FEATURES */}
      </div>
    </div>
  );
}
