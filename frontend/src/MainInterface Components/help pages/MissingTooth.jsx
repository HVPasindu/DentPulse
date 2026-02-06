import { motion } from "framer-motion";

export default function MissingTooth() {
  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">
          Missing Tooth
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          A missing tooth can affect chewing, speech, and appearance if not
          treated.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Why It Matters</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Shifting of nearby teeth</li>
            <li>Difficulty chewing</li>
            <li>Jawbone loss</li>
          </ul>
        </section>

        <div className="mt-8 flex justify-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700">
            Book a Dental Appointment
          </button>
        </div>
      </motion.div>
    </div>
  );
}
