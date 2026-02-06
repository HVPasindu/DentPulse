import { motion } from "framer-motion";

export default function MeetDoctorHero() {
  return (
    <section className="bg-gradient-to-b from-green-100 to-green-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT: Doctor Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <img
              src="doctor.png"
              alt="Our Doctor"
              className="w-[320px] h-[420px] object-cover rounded-3xl shadow-xl border-4 border-green-200"
            />
            {/* Decorative circle */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-200 rounded-full -z-10"></div>
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h4 className="text-green-600 font-semibold tracking-wide uppercase">
            Meet Our Doctor
          </h4>

          <h2 className="text-4xl font-extrabold text-green-800 leading-tight">
            Dr. Amanda Silva
          </h2>

          <p className="text-green-700 font-medium text-lg">
            General & Cosmetic Dentist
          </p>

          <p className="text-gray-700 text-lg leading-relaxed">
            Dr. Amanda Silva has over <span className="font-semibold text-green-700">10 years</span> of
            experience in providing gentle, high-quality dental care. She
            believes in patient comfort, modern treatments, and creating
            confident smiles.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="bg-white rounded-xl p-4 shadow">
              🦷 10+ Years Experience
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              ⭐ Trusted by 2,000+ Patients
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              🌿 Gentle & Modern Care
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              📍 Colombo, Sri Lanka
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md">
              Book Appointment
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
