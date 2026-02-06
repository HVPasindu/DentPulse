import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ClinicLocation() {
  return (
    <section id="location" className="bg-green-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT: Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-green-700">
            Visit Our Clinic
          </h2>

          <p className="text-gray-600 text-lg">
            We are conveniently located and easily accessible. Visit us for
            comfortable, modern dental care in a calm and welcoming environment.
          </p>

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow">
              <MapPin className="text-green-600 mt-1" />
              <p className="text-gray-700">
                DentPulse Dental Clinic,<br />
                Main Street, Colombo 07,<br />
                Sri Lanka
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
              <Phone className="text-green-600" />
              <p className="text-gray-700">
                +94 77 123 4567
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
              <Clock className="text-green-600" />
              <p className="text-gray-700">
                Mon – Sat : 9.00 AM – 6.00 PM
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md">
              Get Directions
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-green-200"
        >
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps?q=Colombo%207%20Sri%20Lanka&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
