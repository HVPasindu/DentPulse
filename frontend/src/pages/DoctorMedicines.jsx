import React, { useState } from "react";

export default function DoctorMedicines() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const medicines = [
    { id: 1, name: "Paracetamol 500mg", brand: "Acme", qty: 120, status: "available" },
    { id: 2, name: "Amoxicillin 250mg", brand: "BioPharm", qty: 4, status: "limited" },
    { id: 3, name: "Cetirizine 10mg", brand: "HealAll", qty: 0, status: "out" },
    { id: 4, name: "Ibuprofen 200mg", brand: "PainFree", qty: 15, status: "available" },
    { id: 5, name: "Metformin 500mg", brand: "GlucoCare", qty: 2, status: "limited" },
  ];

  const badges = {
    available: "bg-green-100 text-green-700",
    limited: "bg-yellow-100 text-yellow-700",
    out: "bg-red-100 text-red-700",
  };

  const filtered = medicines.filter((m) => {
    const matchFilter =
      filter === "all" ? true : m.status === filter;
    const matchQuery =
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.brand.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Medicines</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search medicines..."
            className="border px-3 py-1 rounded-md focus:ring-2 focus:ring-blue-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={() => { setQuery(""); setFilter("all"); }}
            className="px-3 py-1 border rounded-md"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "available", "limited", "out"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md border text-sm ${
              filter === f ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {f === "all"
              ? "All"
              : f === "available"
              ? "Available"
              : f === "limited"
              ? "Limited"
              : "Out of Stock"}
          </button>
        ))}
      </div>

      {/* Medicines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 && (
          <p className="text-gray-500">No medicines found.</p>
        )}

        {filtered.map((m) => (
          <div
            key={m.id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold">{m.name}</h2>
              <p className="text-gray-500 text-sm">Brand: {m.brand}</p>
              <p className="text-gray-600 text-sm mt-1">
                Qty: <span className="font-medium">{m.qty}</span>
              </p>
            </div>

            <span
              className={`px-2 py-1 text-xs rounded-full ${badges[m.status]}`}
            >
              {m.status === "available"
                ? "Available"
                : m.status === "limited"
                ? "Limited"
                : "Out of stock"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
