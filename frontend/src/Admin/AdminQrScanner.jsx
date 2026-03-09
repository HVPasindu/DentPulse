
import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import PatientProfile from "./PatientProfile";

const AdminQrScanner = () => {
  const [patient, setPatient] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [scannerActive, setScannerActive] = useState(true);

  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerActive) return;
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scannerRef.current = scanner;
    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      scanner.clear();
      scannerRef.current = null;
      setScannerActive(false);
      handleQrResult(decodedText);
    }

    function onScanError() {}

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [scannerActive]);

  const handleQrResult = async (qrText) => {
    try {
      const patientId = qrText.trim().split("/patient/")[1];
      if (!patientId) throw new Error("Invalid QR Code");

      const token = localStorage.getItem("authToken");

      const profileRes = await fetch(
        `http://localhost:8080/api/v1/patient/admin/${patientId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!profileRes.ok) throw new Error("Patient not found");

      const profileData = await profileRes.json();

      const historyRes = await fetch(
        `http://localhost:8080/api/v1/patient/admin/${patientId}/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const historyData = historyRes.ok ? await historyRes.json() : [];
      const historyDataFormatted = historyData.map((record) => ({
        id: record.treatment_id,
        procedure: record.diagnosis,
        date: new Date(record.treatment_date).toISOString().slice(0, 10),
        cost: "-",
      }));

      setPatient({
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
      });

      setShowProfile(true);
    } catch (err) {
      alert(err.message);
      setScannerActive(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-8">
      {/* Header */}
      <div className="max-w-5xl align-middle mb-8">
        <h1 className="text-4xl font-serif font-bold text-green-800">
          Admin QR Scanner
        </h1>
        <p className="text-green-600 mt-2">
          Scan patient QR codes to view profile & treatment history
        </p>
      </div>

      {/* Scanner Card */}
      {scannerActive && (
        <div className="max-w-md mx-auto bg-white border border-green-300 rounded-2xl shadow-xl p-6 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              Scanning Active
            </span>
          </div>

          <div
            id="qr-reader"
            className="mx-auto w-[280px] border-2 border-dashed border-green-400 rounded-xl p-2"
          />

          <p className="mt-4 text-sm text-gray-500">
            Align the QR code inside the box
          </p>
        </div>
      )}

      {/* Patient Profile */}
      {showProfile && patient && (
        <div className="max-w-6xl mx-auto mt-8">
          <PatientProfile
            patient={patient}
            onClose={() => {
              setShowProfile(false);
              setScannerActive(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminQrScanner;
