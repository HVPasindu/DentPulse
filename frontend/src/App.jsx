import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PaitentProfile from "./PatientPages/MyProfile/PaitentProfile";
import PatientHeader from "./PatientPages/StaticPages/PatientHeader";
import { PatientIdCard } from "./PatientPages/MyProfile/PatientIdCard";
import { FamilyMembers } from "./PatientPages/FamilyMember/FamilyMembers";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patient" element={<Layout />}>
          <Route index element={<PaitentProfile/>}/>
          <Route path="family" element={<FamilyMembers />} />
          <Route path="bookappointments" element={<FamilyMembers />} />
          <Route path="myappointments" element={<FamilyMembers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* All child routes will render inside the Layout */}
//         <Route index element={<PatientDashboard />} />
//         <Route path="dashboard" element={<PatientDashboard />} />
//         <Route path="appointments" element={<PatientAppointments />} />
//         <Route path="records" element={<PatientRecords />} />
//         <Route path="profile" element={<PatientProfile />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
