import React, { useState } from "react";

export const PatientIdCard = (props) => {
  const [show, Setshow] = useState(true);

  const [user, SetUsuer] = useState({
    userid: "1001",
    name: "Thushan Jayathilaka",
    contact: "43543554",
    address: "no 654 rathnapura ",
    dob: "2009/08/12",
  });

  const showhide = () => {
    Setshow(!show);
  };

  return (
    <div className="">
      <div className="p-8">
        <button
          className=" p-4 text-white bg-cyan-500 hover:bg-cyan-800 rounded-2xl  "
          onClick={showhide}
        >
          View/Hide ID Card
        </button>
      </div>
      {show && (
        <div className="border-2 rounded-2xl border-cyan-500 shadow-2xl flex  flex-col justify-center ">
          <div className="bg-cyan-500 p-4 font-7xl font-bold"> DentPluse</div>
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
      )}
    </div>
  );
};
