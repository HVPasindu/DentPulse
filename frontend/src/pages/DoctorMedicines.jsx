import React, { useEffect, useState } from "react";
import { getAllMedicines } from "../api/medicineApi";



const DoctorMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH MEDICINES ================= */
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const data = await getAllMedicines();


      const formattedData = data.map((med) => ({
        id: med.medicine_id,
        name: med.medicineName || "Unknown Medicine",
        dosage: med.dosage || "N/A",
        brand: med.brand || "Unknown",
        qty: med.quantity,

        status:
          med.medicineStatus === "AVAILABLE"
            ? "available"
            : med.medicineStatus === "LIMITED"
            ? "limited"
            : "out",
      }));

      setMedicines(formattedData);
      setError(null);
    } catch (err) {
      setError("Failed to load medicines. Please try again.");
      console.error("Medicine fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredMedicines = medicines.filter((m) => {
    const matchStatus = filter === "all" || m.status === filter;
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const badges = {
    available: "bg-cyan-100 text-cyan-700",
    limited: "bg-yellow-100 text-yellow-700",
    out: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Medicines</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full px-4 py-2 border border-cyan-500 rounded-lg"
      />

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "available", "limited", "out"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded border ${
              filter === f ? "bg-cyan-500 text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p>Loading medicines...</p>}

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedicines.length === 0 && (
            <p className="text-gray-500">No medicines found</p>
          )}

          {filteredMedicines.map((m) => (
            <div
              key={m.id}
              className="border p-4 rounded-lg border-cyan-500 shadow-sm flex justify-between"
            >
              <div>
                <h2 className="font-semibold">{m.name}</h2>
                <p className="text-sm text-gray-500">Brand: {m.brand}</p>
                <p className="text-sm text-gray-500">Dosage: {m.dosage}</p>
                <p className="text-sm mt-1">
                  Qty: <span className="font-medium">{m.qty}</span>
                </p>
              </div>

              <span
                className={`px-2 py-1 h-fit text-xs rounded-full ${badges[m.status]}`}
              >
                {m.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorMedicines;
