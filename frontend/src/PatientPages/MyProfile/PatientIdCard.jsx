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
import { QRCodeSVG as QRCode } from "qrcode.react";
import { IdCard, Download, Printer } from "lucide-react";
import { motion } from "motion/react";

export const PatientIdCard = ({ patient }) => {
  if (!patient) return null;

  const qrData = `${window.location.origin}/patient/${patient.id}`;

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
      <div className="border-2 rounded-lg border-green-600 shadow-lg hover:shadow-4xl hover:scale-110 duration-500 flex flex-col justify-center w-full md:w-[90%] mx-auto">
        {/* Top bar */}
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
        <div className="flex flex-row justify-around p-">
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

      {/* Buttons */}
      <div className="p-10">
        <motion.button
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
