// import React, { useEffect } from "react";
// import { useState } from "react";
// import { QRCodeSVG as QRCode } from "qrcode.react";
// import { Download, Printer,X } from "lucide-react";

// export const PatientIdCard = ({ FormData, closeIdModel }) => {
//   const [User, setUser] = useState({
//     userid: "",
//     name: "",
//     contact: "",
//     address: "",
//     dob: "",
//     register_year: "",
//   });

//   useEffect(() => {
//     console.log("this is form data", FormData);
//     setUser({
//       userid: FormData.id,
//       name: FormData.name,
//       contact: FormData.phone,
//       email: FormData.email,
//       date: FormData.date,
//       address: FormData.address,
//       register_year: "2025",
//     });
//   }, [FormData]);


//   const qrData = JSON.stringify({
//     patientId: User.userid,
//     name: User.name,
//     contact: User.contact,
//     dob: User.dob,
//   });

//   return (
//     <div>
//       <div
//         className="  fixed inset-0  bg-opacity-10 flex items-center justify-center z-50 p-4 backdrop-blur-sm  "
//         onClick={closeIdModel}
//       >
//         <div className="border-2 border-green-500 bg-white rounded-2xl  w-[50%] p-11" onClick={(e) => e.stopPropagation()}>
//           <div className="flex flex-row justify-between">
//             <div className="grid grid-cols-1 pb-4">
//               <h1 className="text-green-800 text-lg">Patient ID Card</h1>
//               <h1 className="text-green-400 text-lg">
//                 View and download your ID card
//               </h1>
//             </div>
//             <div className="">
//               <X
//                 className="cursor-pointer hover:text-green-600"
//                 onClick={closeIdModel}
//               />
//             </div>
//           </div>

//           <div className="flex flex-row justify-end gap-10 pb-4">
//             <div>
//               <button className="p-2 bg-green-500 rounded-xl text-white text-lg hover:bg-green-700">
//                 <div className="flex flex-row justify-evenly gap-x-0.5">
//                   <div>
//                     <Download />
//                   </div>
//                   <div>Download Card</div>
//                 </div>
//               </button>
//             </div>
//             <div>
//               <button className=" p-2 bg-white border-2 border-green-400 rounded-xl text-green-600 text-lg hover:bg-green-100 hover:text-black">
//                 <div className="flex flex-row justify-evenly gap-x-0.5">
//                   <div>
//                     <Printer />
//                   </div>
//                   <div>Print Card</div>
//                 </div>
//               </button>
//             </div>
//           </div>
//           <div className="border-2 rounded-lg border-green-600 shadow-2xl  flex  flex-col justify-center w-full  md:w-[90%]  mx-auto">
//             <div className="bg-green-700 p-4 flex flex-row justify-around rounded-lg">
//               <div className="grid grid-cols-1">
//                 <h1 className="text-white text-2xl font-semibold">DentPulse</h1>
//                 <h1 className="text-white text-xl font-normal">
//                   Patient Identification Card
//                 </h1>
//               </div>

//               <h1 className="text-white text-lg font-light">
//                 Member Since :{User.register_year}
//               </h1>
//             </div>
//             <div className="flex flex-row justify-evenly">
//               <div className="pl-4">
//                 <h1 className="text-green-400 text-lg font-bold">Full Name</h1>
//                 <h1 className="text-green-800 font-semibold">{User.name}</h1>
//                 <h1 className="text-green-400 text-lg font-bold">Patient ID</h1>
//                 <h1 className="text-green-800 font-semibold">{User.userid}</h1>
//                 <h1 className="text-green-400 text-lg font-bold">Contact</h1>
//                 <h1 className="text-green-800 font-semibold">{User.contact}</h1>
//                 <h1 className="text-green-400 text-lg font-bold">Address</h1>
//                 <h1 className="text-green-800 font-semibold">{User.address}</h1>
//                 <h1 className="text-green-400 text-lg font-bold">Date Of Birth</h1>
//                 <h1 className="text-green-800 font-semibold" >{User.date}</h1>
//                 <h1 className="text-green-400 text-lg font-bold">Email Address</h1>
//                 <h1 className="text-green-800 font-semibold">{User.email}</h1>
//               </div>
//               <div
//                 className="pt-3 flex flex-col justify-center
//             items-center"
//               >
//                 <QRCode value={qrData} size={128} level="M" />
//                 <h1 className="text-green-700 pt-0.5 ">Scan QR Code</h1>
//               </div>
//             </div>

//             <div className="">
//               <hr className=" p-0.5" />
//               <div className="flex flex-row justify-around p-1">
//                 <h1 className="text-green-800 text-sm">
//                   For Emergency Hotline:011-566600
//                 </h1>
//                 <h1 className="text-green-800 text-sm">
//                   123 Dental Street, NY 10001
//                 </h1>
//               </div>
//               <div className="bg-green-700 rounded-lg flex justify-center p-4 ">
//                 <h1 className="font-extralight text-xs text-white">
//                   This card is the property of Bright Smile Dental and must be
//                   presented at each visit
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useEffect, useState } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { IdCard, Download, Printer, X } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

export const PatientIdCard = ({ FormData, closeIdModel }) => {
  const [patient, setPatient] = useState(null);

  // ✅ LOGIC: sync selected member safely
  useEffect(() => {
    if (!FormData) return;

    setPatient({
      id: FormData.id,
      patientId: FormData.id,
      fullName: FormData.name,
      phone: FormData.phone,
      gender: FormData.gender,
      address: FormData.address,
      birthDate: FormData.date,
    });
  }, [FormData]);

  // ✅ Stable QR (never changes with appointments)
  const qrData = patient
    ? `${window.location.origin}/patient/${patient.id}`
    : "";

  if (!patient) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeIdModel}
    >
      <div
        className="border border-green-400 bg-white rounded-2xl p-11 w-[40%]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex justify-end">
          <X
            className="cursor-pointer hover:text-green-600"
            onClick={closeIdModel}
          />
        </div>

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
                <h1 className="text-white font-semibold">
                  PT-{patient.patientId}
                </h1>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-row justify-around p-6">
            {/* Left details */}
            <div className="pl-4 space-y-1">
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

              <h1 className="text-green-400 text-lg font-bold">
                Date Of Birth
              </h1>
              <h1 className="text-green-800 text-lg font-semibold">
                {patient.birthDate}
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
        <div className="p-8">
          <motion.button
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
