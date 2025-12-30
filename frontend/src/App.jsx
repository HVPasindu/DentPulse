import React from "react";
import { Header } from "./MainInterface Components/Header";
import { Footer } from "./MainInterface Components/Footer";
import { Hero } from "./MainInterface Components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Services } from "./MainInterface Components/ServicesCard";
import { MiddleSection } from "./MainInterface Components/MiddleSection";
import { Contact } from "./MainInterface Components/Contact";
import Carosuel from "./MainInterface Components/Carosuel";
import Layout from "./Layout";
import Home from "./index/Home";


import Sidebar from "./components/Sidebar";
import AppDashboard from "./pages/AppDashboard";
import DoctorMedicines from "./pages/DoctorMedicines";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-blue-50 min-h-screen flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="ml-64 flex-1 p-6 md:p-8">
          <Routes>
            <Route path="/" element={<AppDashboard />} />
            <Route path="/doctor-medicines" element={<DoctorMedicines/>} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;