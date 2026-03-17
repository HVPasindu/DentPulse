



import React, { useEffect, useState } from "react";
import axios from "axios";
import { PatientDetail } from "./PatientDetail";
import { PatientIdCard } from "./PatientIdCard";

const MainInterface = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/patient/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPatient(res.data);
      } catch (err) {
        console.error("Failed to fetch patient", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  if (loading) {
    return <p className="text-green-700 p-6">Loading patient data...</p>;
  }

  return (
   <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6 w-full  max-w-6xl mx-auto">
      <PatientDetail patient={patient} setPatient={setPatient} />
      <PatientIdCard patient={patient} />
    </div>
  );
};

export default MainInterface;
