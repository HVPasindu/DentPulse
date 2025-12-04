import React from "react";
import Sidebar from "./components/Sidebar";
import AppDashboard from "./pages/AppDashboard";
import DoctorMedicines from "./pages/DoctorMedicines";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
