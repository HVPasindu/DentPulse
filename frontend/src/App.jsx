import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import PatientManagement from "./Pages/PatientManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />        {/* Dashboard */}
        <Route path="/Patients" element={<PatientManagement />} /> {/* Patient page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
