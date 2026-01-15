// import React, { useEffect, useState } from "react";
// import { QRCodeSVG as QRCode } from "qrcode.react";
// import { PatientDetail } from "./PatientDetail";
// import { IdCard, Download, Printer } from "lucide-react";
// import { motion } from "motion/react";
// import { useParams } from "react-router-dom";
// export const PatientIdCard = () => {

// const [user, setUser] = useState({
//   id: "",
//   fullName: "",
//   phone: "",
//   address: "",
//   dob: "",
//   gender: "",
// });

//   const {id} =useParams();

// const qrData = `${window.location.origin}/patient/${user.id}`;

// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/v1/patient/${id}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch patient data");
//       }

//       const data = await response.json();
//       setUser(data);

//       console.log("✅ User data fetched:", data);
//     } catch (error) {
//       console.error("❌ error fetching data", error);
//     }
//   };

//   fetchUserData();
// }, [id]);

//   return (
//     <div className=" grid grid-cols-1 lg:grid-cols-2 p-6  ">
//       <div className="p-4">
//         <PatientDetail />
//       </div>

//       <div className="border border-green-400 bg-white rounded-2xl   p-11">
//         <div className="grid grid-cols-1 pb-10">
//           <div className="flex flex-row gap-x-2">
//             <IdCard />
//             <h1 className="text-green-800 text-3xl  font-stretch-105% font-serif">
//               Patient ID Card
//             </h1>
//           </div>

//           <h1 className="text-green-400 text-2xl ">
//             View and download your ID card
//           </h1>
//         </div>
//         <div className="border-2 rounded-lg border-green-600 shadow-lg hover:shadow-4xl hover:scale-110 duration-500  flex  flex-col justify-center w-full  md:w-[90%]  mx-auto">
//           <div className="bg-green-700 p-4 flex flex-row justify-around rounded-lg">
//             <div className="grid grid-cols-1">
//               <h1 className="text-white text-2xl font-semibold">DentPulse</h1>
//               <h1 className="text-white text-xl font-normal">
//                 Patient Identification Card
//               </h1>
//             </div>

//           </div>
//           <div className="flex flex-row justify-evenly">
//             <div className="pl-4">
//               <h1 className="text-green-400 text-lg font-bold">Full Name</h1>
//               <h1 className="text-green-800 text-lg font-semibold">
//                 {user.fullName}
//               </h1>
//               <h1 className="text-green-400 text-lg font-bold">Patient ID</h1>
//               <h1 className="text-green-800 text-lg font-semibold">
//                 {user.id}
//               </h1>
//               <h1 className="text-green-400 text-lg font-bold">Contact</h1>
//               <h1 className="text-green-800 text-lg font-semibold">
//                 {user.phone}

//               </h1>
//                 <h1 className="text-green-400 text-lg font-bold">Gender</h1>
//               <h1 className="text-green-800 text-lg font-semibold">
//                 {user.gender}

//               </h1>
//               <h1 className="text-green-400 text-lg font-bold">Address</h1>
//               <h1 className="text-green-800 text-lg font-semibold">
//                 {user.address}
//               </h1>
//               <h1 className="text-green-400 text-lg font-bold">
//                 Date Of Birth
//               </h1>
//               <h1 className="text-green-800 text-lg font-semibold">
//                 {user.dob}
//               </h1>
//             </div>
//             <div
//               className="pt-3 flex flex-col justify-center
//             items-center"
//             >
//               <QRCode value={qrData} size={128} level="M" />
//               <h1 className="text-green-700 pt-0.5 ">Scan QR Code</h1>
//             </div>
//           </div>

//           <div className="">
//             <hr className=" p-0.5" />
//             <div className="flex flex-row justify-around p-1">
//               <h1 className="text-green-800 text-sm">
//                 For Emergency Hotline:011-566600
//               </h1>
//               <h1 className="text-green-800 text-sm">
//                 123 Dental Street, NY 10001
//               </h1>
//             </div>
//             <div className="bg-green-700 rounded-lg flex justify-center p-4 ">
//               <h1 className="font-extralight text-sm text-white">
//                 This card is the property of DentPulse Dental and must be
//                 presented at each visit
//               </h1>
//             </div>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 p-7 justify-items-center gap-y-2">
//           <div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               className="p-4 bg-green-500 rounded-xl text-white hover:bg-green-700"
//             >
//               <div className="flex flex-row items-center gap-x-1.5">
//                 {/* Icon animation */}
//                 <motion.div
//                   whileHover={{ y: -2 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   <Download />
//                 </motion.div>

//                 <div>Download Card</div>
//               </div>
//             </motion.button>
//           </div>
//           <div>
//             <motion.button
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.96 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               className="p-4 bg-white border-2 border-green-600 rounded-xl
//              text-green-600 hover:border-black hover:bg-green-50 hover:text-black"
//             >
//               <div className="flex flex-row items-center gap-x-1.5">
//                 {/* Icon micro-animation */}
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   <Printer />
//                 </motion.div>

//                 <div>Print Card</div>
//               </div>
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React from "react";
// import { QRCodeSVG as QRCode } from "qrcode.react";
// import { IdCard, Download, Printer } from "lucide-react";
// import { motion } from "motion/react";

// export const PatientIdCard = ({ patient }) => {
//   const qrData = `${window.location.origin}/patient/${patient.id}`;

//   return (
//     <div className="border border-green-400 bg-white rounded-2xl p-11">
//       <div className="flex gap-2 items-center mb-6">
//         <IdCard />
//         <h1 className="text-3xl font-serif text-green-800">Patient ID Card</h1>
//       </div>

//       <div className="border-2 border-green-600 rounded-lg shadow-lg p-6">
//         <div className="bg-green-700 text-white p-4 rounded-lg text-center">
//           <h1 className="text-2xl font-semibold">DentPulse</h1>
//           <p>Patient Identification Card</p>
//         </div>

//         <div className="flex justify-between mt-6">
//           <div>
//             <p><strong>Name:</strong> {patient.fullName}</p>
//             <p><strong>ID:</strong> {patient.id}</p>
//             <p><strong>Phone:</strong> {patient.phone}</p>
//             <p><strong>Gender:</strong> {patient.gender}</p>
//             <p><strong>DOB:</strong> {patient.birthDate}</p>
//             <p><strong>Address:</strong> {patient.address}</p>
//           </div>

//           <div className="text-center">
//             <QRCode value={qrData} size={128} />
//             <p className="text-green-700 mt-1">Scan QR</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-around mt-6">
//         <motion.button className="bg-green-500 text-white p-3 rounded-xl">
//           <Download /> Download
//         </motion.button>
//         <motion.button className="border border-green-600 p-3 rounded-xl">
//           <Printer /> Print
//         </motion.button>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useRef } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { IdCard, Download, Printer } from "lucide-react";
import { motion } from "motion/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PatientIdCard = ({ patient }) => {
  if (!patient) return null;
  const cardRef = useRef(null);
  const pdfCardRef = useRef(null);

  const qrData = `${window.location.origin}/patient/${patient.id}`;
  const handleDownloadPDF = async () => {
    if (!pdfCardRef.current) return;

    const canvas = await html2canvas(pdfCardRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);
    pdf.save(`Patient_ID_${patient.id}.pdf`);
  };

  return (
    <div className="border border-green-400 bg-white rounded-2xl p-11">
      {/* Header */}
      <div className="grid grid-cols-1 pb-10">
        <div className="flex flex-row gap-x-2 items-center">
          <IdCard />
          <h1 className="text-green-800 text-3xl font-stretch-105% font-serif">
            Patient ID Card
          </h1>
        </div>

        <h1 className="text-green-400 text-2xl">
          View and download your ID card
        </h1>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="border-2 rounded-lg border-green-600 shadow-lg hover:shadow-4xl hover:scale-110 duration-500 flex flex-col justify-center w-full md:w-[90%] mx-auto bg-white"
      >
        <div className="bg-green-700 p-4 flex flex-row justify-around rounded-lg">
          <div className="flex flex-row justify-between w-full">
            <div>
              <h1 className="text-white text-2xl font-semibold">DentPulse</h1>
              <h1 className="text-white text-xl font-normal">
                Patient Identification Card
              </h1>
            </div>
            <div>
              <h1 className="text-white text-lg font-bold">Patient ID</h1>
              <h1 className="text-white text-xm font-semibold">
                <h1>PT-{patient.patientId}</h1>
              </h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-row justify-around p-6">
          {/* Left details */}
          <div className="pl-4 space-y-0.1">
            <h1 className="text-green-400 text-lg font-bold">Full Name</h1>
            <h1 className="text-green-800 text-lg font-semibold">
              {patient.fullName}
            </h1>

            <h1 className="text-green-400 text-lg font-bold">Contact</h1>
            <h1 className="text-green-800 text-lg font-semibold">
              {patient.phone}
            </h1>

            <h1 className="text-green-400 text-lg font-bold">Gender</h1>
            <h1 className="text-green-800 text-lg font-semibold">
              {patient.gender}
            </h1>

            <h1 className="text-green-400 text-lg font-bold">Address</h1>
            <h1 className="text-green-800 text-lg font-semibold">
              {patient.address}
            </h1>

            <h1 className="text-green-400 text-lg font-bold">Date Of Birth</h1>
            <h1 className="text-green-800 text-lg font-semibold">
              {patient.birthDate || patient.dob}
            </h1>
          </div>

          {/* QR */}
          <div className="pt-3 flex flex-col justify-center items-center">
            <QRCode value={qrData} size={128} level="M" />
            <h1 className="text-green-700 pt-1">Scan QR Code</h1>
          </div>
        </div>

        {/* Footer */}
        <div>
          <hr className="p-0.5" />
          <div className="flex flex-row justify-around p-2">
            <h1 className="text-green-800 text-sm">
              Emergency Hotline: 011-566600
            </h1>
            <h1 className="text-green-800 text-sm">
              123 Dental Street, NY 10001
            </h1>
          </div>

          <div className="bg-green-700 rounded-lg flex justify-center p-4">
            <h1 className="font-light text-sm text-white">
              This card is the property of DentPulse Dental and must be
              presented at each visit
            </h1>
          </div>
        </div>
      </div>
      {/* =================== PDF-ONLY CARD =================== */}
      <div
        ref={pdfCardRef}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "420px",
          background: "#ffffff",
          fontFamily: "Arial, sans-serif",
          border: "2px solid #15803d",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#15803d",
            color: "#ffffff",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              DentPulse
            </div>
            <div style={{ fontSize: "14px" }}>Patient Identification Card</div>
          </div>
          <div style={{ fontWeight: "bold" }}>PT-{patient.patientId}</div>
        </div>

        {/* Body */}
        <div style={{ padding: "12px", display: "flex", gap: "12px" }}>
          <div style={{ flex: 1, fontSize: "13px" }}>
            <p>
              <b>Name:</b> {patient.fullName}
            </p>
            <p>
              <b>Phone:</b> {patient.phone}
            </p>
            <p>
              <b>Gender:</b> {patient.gender}
            </p>
            <p>
              <b>Address:</b> {patient.address}
            </p>
            <p>
              <b>DOB:</b> {patient.birthDate}
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <QRCode value={qrData} size={90} />
            <div style={{ fontSize: "11px", marginTop: "4px" }}>Scan QR</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            padding: "6px 10px",
            color: "#14532d",
          }}
        >
          <span>Emergency Hotline: 011-566600</span>
          <span>123 Dental Street, NY 10001</span>
        </div>
        {/* Footer */}
        <div
          style={{
            background: "#15803d",
            color: "#ffffff",
            fontSize: "11px",
            textAlign: "center",
            padding: "8px",
          }}
        >
          {/* Emergency & Address */}
          This card is the property of DentPulse Dental and must be presented at
          each visit
        </div>
      </div>
      {/* Buttons */}
      <div className="p-10">
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
  );
};
