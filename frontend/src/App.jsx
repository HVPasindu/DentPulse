import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import PatientsPage from "./Pages/PatientsPage";
import InventoryPage from "./Pages/InventoryPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />        {/* Dashboard */}
        <Route path="/Patients" element={<PatientsPage />} /> {/* Patient page */}
        <Route path="/Inventory" element={<InventoryPage />} /> {/* Inventory page */}
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
