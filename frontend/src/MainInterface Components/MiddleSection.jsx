import { MiddleSectionCard } from "./MiddleSectionCard";
import { middledata } from "../data/middledata";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export function MiddleSection({ link }) {
  const navigate = useNavigate();

  const switchlologin = () => {
    navigate("/login");
  };

  return (
    
   <>
      {/* SECTION CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-20">

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-medium text-green-700">
            Why Choose DentPulse Clinic
          </h1>

          <p className="text-lg m-8 text-green-600 text-center">
            Enhance your smile with our cosmetic dentistry services, including
            teeth whitening, veneers, bonding, and smile makeovers tailored to
            your needs.
          </p>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {middledata.map((middle_data, index) => (
              <MiddleSectionCard
                key={index}
                main_text={middle_data.main_text}
                second_text={middle_data.second_text}
              />
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div className="bg-green-200 rounded-3xl flex items-center justify-center max-w-[500px] h-[450px] my-9">
          <img
            src="check.jpeg"
            alt="middlesection_image"
            className="w-[85%] h-auto object-cover rounded-2xl"
          />
        </div>

      </div>

      {/* FULL WIDTH CTA */}
      <div className="w-full bg-green-600 py-20 flex flex-col justify-center items-center text-center">
        <h1 className="font-semibold text-3xl text-white p-5">
          Ready to Schedule Your Visit
        </h1>

        <p className="font-normal text-lg text-white max-w-xl">
          Our friendly staff is here to help you. Book your appointment today
          and take the first step towards a healthier smile.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white p-3 rounded-xl px-6 shadow-lg hover:bg-green-200 mt-6"
          onClick={switchlologin}
        >
          Make An Appointment
        </motion.button>
      </div>
    </>
    
  );
}
