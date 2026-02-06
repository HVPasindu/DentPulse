import React, { useEffect, useState, useRef } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { IdCard, Download, X } from "lucide-react";
import { motion } from "motion/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PatientIdCard = ({ FormData, closeIdModel }) => {
  const [patient, setPatient] = useState(null);

  // 🔥 PDF-only hidden card ref
  const pdfCardRef = useRef(null);

  /* -------------------- DATA NORMALIZATION -------------------- */
  useEffect(() => {
    if (!FormData) return;

    setPatient({
      id: FormData.id,
      patientId: FormData.id,
      fullName: FormData.name,
      phone: FormData.phone,
      gender: FormData.gender,
      address: FormData.address,
      birthDate: FormData.birthDate || FormData.date,
    });
  }, [FormData]);

  if (!patient) return null;

  /* -------------------- STABLE QR -------------------- */
  const qrData = `${window.location.origin}/patient/${patient.id}`;

  /* -------------------- PDF DOWNLOAD -------------------- */
  const handleDownloadPDF = async () => {
    if (!pdfCardRef.current) return;

    const canvas = await html2canvas(pdfCardRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);
    pdf.save(`Patient_ID_${patient.id}.pdf`);
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeIdModel}
    >
      <div
        className="border border-green-400 bg-white rounded-2xl p-11 w-[40%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------------- CLOSE ---------------- */}
        <div className="flex justify-end">
          <X
            className="cursor-pointer hover:text-green-600"
            onClick={closeIdModel}
          />
        </div>

        {/* ---------------- HEADER ---------------- */}
        <div className="grid grid-cols-1 pb-10">
          <div className="flex gap-2 items-center">
            <IdCard />
            <h1 className="text-green-800 text-3xl font-serif">
              Patient ID Card
            </h1>
          </div>
          <h2 className="text-green-400 text-2xl">
            View and download your ID card
          </h2>
        </div>

        {/* =================== VISIBLE UI CARD =================== */}
        <div className="border-2 rounded-lg border-green-600 shadow-lg w-[90%] mx-auto">
          {/* Top */}
          <div className="bg-green-700 p-4 flex justify-between rounded-lg">
            <div>
              <h1 className="text-white text-2xl font-semibold">DentPulse</h1>
              <p className="text-white text-lg">Patient Identification Card</p>
            </div>
            <div className="text-white font-bold">
              <p>Patient ID</p>
              <p>PT-{patient.patientId}</p>
            </div>
          </div>

          {/* Body */}
          <div className="flex justify-around p-6">
            <div className="space-y-1">
              <p className="text-green-400 font-bold text-xl">Full Name</p>
              <p className="text-green-800 text-lg font-semibold  break-words max-w-xs">
                {patient.fullName}
              </p>

              <p className="text-green-400 font-bold text-xl">Contact</p>
              <p className="text-green-800 text-lg font-semibold">
                {patient.phone}
              </p>

              <p className="text-green-400 font-bold text-xl">Gender</p>
              <p className="text-green-800 text-lg font-semibold">
                {patient.gender}
              </p>

              <p className="text-green-400 font-bold text-xl">Address</p>
              <p className="text-green-800 text-lg font-semibold  break-words max-w-xs">
                {patient.address}
              </p>

              <p className="text-green-400 font-bold text-xl">Date Of Birth</p>
              <p className="text-green-800 text-lg font-semibold">
                {patient.birthDate}
              </p>
            </div>

            <div className="flex flex-col items-center pt-20">
              <QRCode value={qrData} size={128} />
              <p className="text-green-700">Scan QR Code</p>
            </div>
          </div>

          {/* Footer */}
          <div>
            <hr />
            <div className="flex justify-around p-2 text-sm text-green-800">
              <span>Emergency: 011-566600</span>
              <span>123 Dental Street, NY</span>
            </div>
            <div className="bg-green-700 text-white text-xs text-center p-3 rounded-b-lg">
              This card must be presented at each visit
            </div>
          </div>
        </div>

        {/* =================== HIDDEN PDF CARD =================== */}
        <div
          ref={pdfCardRef}
          style={{
            position: "absolute",
            left: "-9999px",
            width: "380px",
            background: "#ffffff",
            fontFamily: "Arial, sans-serif",
            color: "#14532d",
          }}
        >
          <div
            style={{
              border: "2px solid #15803d",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: "#15803d",
                color: "#ffffff",
                padding: "14px",
                display: "table",
                width: "100%",
              }}
            >
              <div style={{ display: "table-row" }}>
                <div style={{ display: "table-cell" }}>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    DentPulse
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    Patient Identification Card
                  </div>
                </div>

                <div
                  style={{
                    display: "table-cell",
                    textAlign: "right",
                    verticalAlign: "middle",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  PT-{patient.patientId}
                </div>
              </div>
            </div>

            {/* BODY */}
            <div style={{ padding: "14px", fontSize: "13px" }}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    {/* LEFT */}
                    <td style={{ width: "65%", verticalAlign: "top" }}>
                      <p>
                        <b>Full Name</b>
                        <br />
                        {patient.fullName}
                      </p>
                      <p>
                        <b>Contact</b>
                        <br />
                        {patient.phone}
                      </p>
                      <p>
                        <b>Gender</b>
                        <br />
                        {patient.gender}
                      </p>
                      <p>
                        <b>Address</b>
                        <br />
                        {patient.address}
                      </p>
                      <p>
                        <b>Date Of Birth</b>
                        <br />
                        {patient.birthDate}
                      </p>
                    </td>

                    {/* RIGHT QR */}
                    <td
                      style={{
                        width: "35%",
                        textAlign: "center",
                        verticalAlign: "middle", // ✅ THIS LINE
                      }}
                    >
                      <QRCode value={qrData} size={100} />
                      <div style={{ fontSize: "11px", marginTop: "6px" }}>
                        Scan QR Code
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div
              style={{
                borderTop: "1px solid #d1fae5",
                padding: "8px",
                fontSize: "11px",
                textAlign: "center",
              }}
            >
              Emergency: 011-566600 &nbsp; | &nbsp; 123 Dental Street, NY
            </div>

            <div
              style={{
                background: "#15803d",
                color: "#ffffff",
                fontSize: "10px",
                textAlign: "center",
                padding: "6px",
              }}
            >
              This card must be presented at each visit
            </div>
          </div>
        </div>

        {/* ---------------- BUTTON ---------------- */}
        <div className="p-8 flex justify-center">
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-green-500 rounded-xl text-white hover:bg-green-700 flex gap-2"
          >
            <Download /> Download Card
          </motion.button>
        </div>
      </div>
    </div>
  );
};
