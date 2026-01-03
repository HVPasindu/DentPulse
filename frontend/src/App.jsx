import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";

import InventoryPage from "./pages/InventoryPage";
import AppointmentPage from "./pages/AppointmentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />

      </Routes>
    </BrowserRouter>
  );
}
