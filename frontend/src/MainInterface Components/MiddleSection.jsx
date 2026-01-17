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
    <div className="grid grid-cols-1 justify-evenly md:grid-cols-2 gap-x-64">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-medium   text-green-700">
          Why Choose DentPulse Clinic
        </h1>
        <h1 className="text-lg m-8 text-green-600">
          Enhance your smile with our cosmetic dentistry services, including
          teeth whitening, veneers, bonding, and smile makeovers tailored to
          your needs.{" "}
        </h1>
        <div className="grid  grid-cols-1 gap-x-7 gap-y-7 md:grid-cols-2 ">
          {middledata.map((middle_data) => (
            <MiddleSectionCard
              main_text={middle_data.main_text}
              second_text={middle_data.second_text}
            />
          ))}
        </div>

        <div></div>
      </div>
      <div className="bg-green-200 rounded-3xl w-[600px] h-[600px] my-9">
        <img
          src="check.jpeg"
          alt="middlesection_image"
          className="w-[800px] h-[500px] pt-20 mx-auto"
        />
      </div>

      <div className=" flex  flex-col bg-green-600 w-screen pt-20 justify-center items-center pb-20">
        <h1 className="font-semibold text-4xl text-white p-5">
          Ready to Shedule Your Visit
        </h1>
        <h1 className="font-normal text-2xl text-white p-7">
          Our friendly staff is here to help you. Book your appointment today
          and take the first step towards a healthier smile.
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white p-3 rounded-xl px-7 shadow-lg hover:bg-green-200 hover:cursor-pointer"
          onClick={switchlologin}
        >
          Make An Appointment
        </motion.button>
      </div>
    </div>
  );
}
