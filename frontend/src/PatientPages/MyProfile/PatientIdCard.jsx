import React, { useState } from "react";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { PatientDetail } from "./PatientDetail";
import { IdCard, Download,Printer } from "lucide-react";
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
    <div className=" grid grid-cols-1 lg:grid-cols-2 p-8  ">
      <div className="p-4">
        <PatientDetail />
      </div>

      <div className="border-2 border-cyan-500 bg-white rounded-2xl   p-11">
        <div className="grid grid-cols-1 pb-10">
          <div className="flex flex-row gap-x-2">
            <IdCard />
            <h1 className="text-cyan-800">Patient ID Card</h1>
          </div>

          <h1 className="text-cyan-400">View and download your ID card</h1>
        </div>
        <div className="border-2 rounded-lg border-cyan-600 shadow-2xl  flex  flex-col justify-center w-full  md:w-[90%]  mx-auto">
          <div className="bg-cyan-500 p-4 flex flex-row justify-around rounded-lg">
            <div className="grid grid-cols-1">
              <h1 className="text-white font-7xl font-semibold">DentPulse</h1>
              <h1 className="text-white font-4xl font-normal">
                Patient Identification Card
              </h1>
            </div>

            <h1 className="text-white font-2xl font-light">
              Member Since :{user.register_year}
            </h1>
          </div>
          <div className="flex flex-row justify-evenly">
            <div className="pl-4">
              <h1 className="text-cyan-400">Full Name</h1>
              <h1 className="text-cyan-800">{user.name}</h1>
              <h1 className="text-cyan-400">Patient ID</h1>
              <h1 className="text-cyan-800">{user.userid}</h1>
              <h1 className="text-cyan-400">Contact</h1>
              <h1 className="text-cyan-800">{user.contact}</h1>
              <h1 className="text-cyan-400">Address</h1>
              <h1 className="text-cyan-800">{user.address}</h1>
              <h1 className="text-cyan-400">Date Of Birth</h1>
              <h1 className="text-cyan-800">{user.dob}</h1>
            </div>
            <div
              className="pt-3 flex flex-col justify-center
            items-center"
            >
              <QRCode value={qrData} size={128} level="M" />
              <h1 className="text-cyan-700 pt-0.5 ">Scan QR Code</h1>
            </div>
          </div>

          <div className="">
            <hr className=" p-0.5" />
            <div className="flex flex-row justify-around p-1">
              <h1 className="text-cyan-800 text-sm">
                For Emergency Hotline:011-566600
              </h1>
              <h1 className="text-cyan-800 text-sm">
                123 Dental Street, NY 10001
              </h1>
            </div>
            <div className="bg-cyan-500 rounded-lg flex justify-center p-4 ">
              <h1 className="font-extralight text-xs text-white">
                This card is the property of Bright Smile Dental and must be
                presented at each visit
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-7 justify-items-center gap-y-2">
          <div>
            <button className="p-4 bg-cyan-500 rounded-xl text-white hover:bg-cyan-700">
              <div className="flex flex-row gap-x-1.5">
                <div>
                  <Download />
                </div>
                <div>Download Card</div>
              </div>
            </button>
          </div>
          <div>
            <button className=" p-4 bg-white border-2 border-cyan-600  rounded-xl text-cyan-600 hover:border-black  hover:bg-cyan-50 hover:text-black">
               <div className="flex flex-row gap-x-1.5">
                <div>
                <Printer />
                </div>
                <div>Print Card</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
