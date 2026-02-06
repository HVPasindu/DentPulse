import { motion } from "framer-motion";

export default function Toothache() {
  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">
          Toothache
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          A toothache is pain in or around a tooth that may indicate dental
          problems such as decay, infection, or injury. It can range from mild
          discomfort to severe, persistent pain.
        </p>

        {/* Causes */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Common Causes
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Dental cavities (tooth decay)</li>
            <li>Tooth infection or abscess</li>
            <li>Cracked or broken tooth</li>
            <li>Gum disease</li>
            <li>Wisdom tooth eruption</li>
            <li>Teeth grinding (bruxism)</li>
          </ul>
        </section>

        {/* Symptoms */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Symptoms
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Sharp, throbbing, or constant pain</li>
            <li>Sensitivity to hot or cold foods</li>
            <li>Pain when chewing or biting</li>
            <li>Swelling around the tooth or jaw</li>
            <li>Fever or headache (in severe cases)</li>
          </ul>
        </section>

        {/* When to see dentist */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            When to See a Dentist
          </h2>
          <p className="text-gray-700">
            You should see a dentist if the pain lasts more than 1–2 days,
            becomes severe, or is accompanied by swelling, fever, or pus.
            Ignoring a toothache can lead to serious infections.
          </p>
        </section>

        {/* Home care */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Temporary Home Care
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Rinse with warm salt water</li>
            <li>Use a cold compress on the cheek</li>
            <li>Keep the area clean</li>
            <li>Avoid very hot, cold, or sugary foods</li>
          </ul>
          <p className="text-sm text-red-600 mt-2">
            ⚠️ Home remedies are temporary and do not replace professional care.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
            Book a Dental Appointment
          </button>
        </div>
      </motion.div>
    </div>
  );
}
