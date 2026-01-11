import React, { useState } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { PatientDetail } from "./PatientDetail";
import { IdCard, Download, Printer } from "lucide-react";
import { motion } from "motion/react";
export const PatientIdCard = () => {
  const [user, SetUsuer] = useState({
    userid: "1001",
    name: "Thushan Jayathilaka",
    contact: "43543554",
    address: "no 654 rathnapura ",
    dob: "2009/08/12",
    register_year: "2025",
  });

  const qrData = JSON.stringify({
    patientId: user.userid,
    name: user.name,
    contact: user.contact,
    dob: user.dob,
  });

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 p-6  ">
      <div className="p-4">
        <PatientDetail />
      </div>

      <div className="border border-green-400 bg-white rounded-2xl   p-11">
        <div className="grid grid-cols-1 pb-10">
          <div className="flex flex-row gap-x-2">
            <IdCard />
            <h1 className="text-green-800 text-3xl  font-stretch-105% font-serif">
              Patient ID Card
            </h1>
          </div>

          <h1 className="text-green-400 text-2xl ">
            View and download your ID card
          </h1>
        </div>
        <div className="border-2 rounded-lg border-green-600 shadow-lg hover:shadow-4xl hover:scale-110 duration-500  flex  flex-col justify-center w-full  md:w-[90%]  mx-auto">
          <div className="bg-green-700 p-4 flex flex-row justify-around rounded-lg">
            <div className="grid grid-cols-1">
              <h1 className="text-white text-2xl font-semibold">DentPulse</h1>
              <h1 className="text-white text-xl font-normal">
                Patient Identification Card
              </h1>
            </div>

            <h1 className="text-white text-lg font-light">
              Member Since :{user.register_year}
            </h1>
          </div>
          <div className="flex flex-row justify-evenly">
            <div className="pl-4">
              <h1 className="text-green-400 text-lg font-bold">Full Name</h1>
              <h1 className="text-green-800 text-lg font-semibold">
                {user.name}
              </h1>
              <h1 className="text-green-400 text-lg font-bold">Patient ID</h1>
              <h1 className="text-green-800 text-lg font-semibold">
                {user.userid}
              </h1>
              <h1 className="text-green-400 text-lg font-bold">Contact</h1>
              <h1 className="text-green-800 text-lg font-semibold">
                {user.contact}
              </h1>
              <h1 className="text-green-400 text-lg font-bold">Address</h1>
              <h1 className="text-green-800 text-lg font-semibold">
                {user.address}
              </h1>
              <h1 className="text-green-400 text-lg font-bold">
                Date Of Birth
              </h1>
              <h1 className="text-green-800 text-lg font-semibold">
                {user.dob}
              </h1>
            </div>
            <div
              className="pt-3 flex flex-col justify-center
            items-center"
            >
              <QRCode value={qrData} size={128} level="M" />
              <h1 className="text-green-700 pt-0.5 ">Scan QR Code</h1>
            </div>
          </div>

          <div className="">
            <hr className=" p-0.5" />
            <div className="flex flex-row justify-around p-1">
              <h1 className="text-green-800 text-sm">
                For Emergency Hotline:011-566600
              </h1>
              <h1 className="text-green-800 text-sm">
                123 Dental Street, NY 10001
              </h1>
            </div>
            <div className="bg-green-700 rounded-lg flex justify-center p-4 ">
              <h1 className="font-extralight text-xs text-white">
                This card is the property of Bright Smile Dental and must be
                presented at each visit
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-7 justify-items-center gap-y-2">
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-4 bg-green-500 rounded-xl text-white hover:bg-green-700"
            >
              <div className="flex flex-row items-center gap-x-1.5">
                {/* Icon animation */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Download />
                </motion.div>

                <div>Download Card</div>
              </div>
            </motion.button>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-4 bg-white border-2 border-green-600 rounded-xl 
             text-green-600 hover:border-black hover:bg-green-50 hover:text-black"
            >
              <div className="flex flex-row items-center gap-x-1.5">
                {/* Icon micro-animation */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Printer />
                </motion.div>

                <div>Print Card</div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
