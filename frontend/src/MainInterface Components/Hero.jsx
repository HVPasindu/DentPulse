import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Calendar, Phone } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();

  const switchlologin = () => {
    navigate("/login");
  };

  return (
    <div
      className="relative bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/lady.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* CONTENT */}
      <div className="relative z-10 px-12 py-10 ">
        {/* TEXT SECTION */}
        <div className="flex flex-col items-start">
          <h1 className="text-white rounded-3xl bg-green-700 my-6 py-1.5 px-4">
            🌟 Trusted by 100000+ Happy Patients
          </h1>
          <div className="w-16 h-1 bg-green-600 mb-3 rounded-full"></div>

          <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight leading-tight text-green-800 mt-4 animate-fadeUp">
            Your Smile, <span className="text-green-600">Our Priority</span>
          </h1>

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
          <button
            className="rounded-xl bg-green-600 text-white px-10 py-6 hover:bg-green-700"
            onClick={switchlologin}
          >
            <div className="flex items-center gap-2">
              <Calendar />
              <span className="font-semibold">Book Appointment</span>
            </div>
          </button>

          <button className="rounded-lg bg-white border-green-600 border-2 px-10 py-4 hover:bg-green-200">
            <div className="flex items-center gap-2">
              <Phone />
              <span className="font-semibold">Contact Us</span>
            </div>
          </button>
        </div>

        {/* FEATURES */}
        <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-lg px-4 py-14 mt-14 text-white font-bold grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="flex gap-2">
            <CircleCheckBig /> Experienced Dentists
          </div>
          <div className="flex gap-2">
            <CircleCheckBig /> Modern Equipment
          </div>
          <div className="flex gap-2">
            <CircleCheckBig /> Flexible Payments
          </div>
          <div className="flex gap-2">
            <CircleCheckBig /> Same-Day Appointments
          </div>
          <div className="flex gap-2">
            <CircleCheckBig /> Family Friendly
          </div>
          <div className="flex gap-2">
            <CircleCheckBig /> Digital X-Rays
          </div>
        </div>

      </div>
    </div>
  );
}
