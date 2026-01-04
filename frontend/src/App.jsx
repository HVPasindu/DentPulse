import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import InventoryPage from "./pages/InventoryPage";
import AppointmentPage from "./pages/AppointmentPage";
import DashboardSidebar from "./Admin/DashboardSidebar";
import BillingPage from "./pages/BillingPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* Container for sidebar + main content */}
      <div className="flex h-screen">
        {/* Sidebar - Added h-full to ensure it stretches the full length */}
        <div className="w-64 bg-gray-100 h-full">
          <DashboardSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/billing" element={<BillingPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}