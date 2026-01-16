import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import PatientProfile from "../Admin/PatientProfile";

const AdminQrScanner = () => {
  const [patient, setPatient] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [scannerActive, setScannerActive] = useState(true);

  useEffect(() => {
    if (!scannerActive) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      scanner.clear();
      setScannerActive(false);
      handleQrResult(decodedText);
    }

    function onScanError(error) {
      // silently ignore scan errors
    }

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scannerActive]);

  const handleQrResult = async (qrText) => {
    try {
      // Expected QR: http://localhost:3000/patient/{id}
      const patientId = qrText.trim().split("/patient/")[1];
      console.log("QR RAW TEXT:", qrText);
      console.log("FINAL patientId:", patientId);


      if (!patientId) throw new Error("Invalid QR Code");

      const token = localStorage.getItem("authToken");

      /* 1️⃣ Fetch profile */
      const profileRes = await fetch(
        `http://localhost:8080/api/v1/patient/admin/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log("PROFILE STATUS:", profileRes.status);
      if (!profileRes.ok) throw new Error("Patient not found");

      const profileData = await profileRes.json();

      /* 2️⃣ Fetch treatment history */
      const historyRes = await fetch(
        `http://localhost:8080/api/v1/patient/admin/${patientId}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const historyData = historyRes.ok ? await historyRes.json() : [];
      const historyDataFormatted = historyData.map((record) => ({
        id: record.treatment_id,
        procedure: record.diagnosis,
        date: new Date(record.treatment_date).toISOString().slice(0, 10),
        cost: "-",
      }));
      /* 3️⃣ Map backend → PatientProfile UI */
      const mappedPatient = {
        id: profileData.id,
        name: profileData.fullName,
        age: profileData.age,
        gender: profileData.gender,
        phone: profileData.phone,
        email: profileData.email,
        address: profileData.address,
        status: "Active",
        lastVisit: "-",
        treatments: historyDataFormatted,
      };

      setPatient(mappedPatient);
      setShowProfile(true);
    } catch (err) {
      alert(err.message);
      setScannerActive(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Admin QR Scanner
      </h1>

      {scannerActive && (
        <div
          id="qr-reader"
          className="w-[300px] border-2 border-green-500 rounded-lg"
        />
      )}

      {showProfile && patient && (
        <PatientProfile
          patient={patient}
          onClose={() => {
            setShowProfile(false);
            setScannerActive(true);
          }}
        />
      )}
    </div>
  );
};

export default AdminQrScanner;
