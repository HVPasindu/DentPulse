import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Services } from "./MainInterface Components/ServicesCard";
import { MiddleSection } from "./MainInterface Components/MiddleSection";
import { Contact } from "./MainInterface Components/Contact";
import Carosuel from "./MainInterface Components/Carosuel";
import ChatbotWidget from "./chatbot/ChatbotWidget";
import Layout from "./Layout";

import Sidebar from "./components/Sidebar";

//home page
import Home from "./pages/Home";

//doctor page
import { DoctorLayout } from "./Layouts/Doctor.Layout";
import AppDashboard from "./pages/AppDashboard";
import DoctorMedicines from "./pages/DoctorMedicines";
import { H1Icon } from "@heroicons/react/24/outline";

//paitent page

import { PatientLayout } from "./Layouts/Patient.Layout";
import MainInterface from "./PatientPages/MyProfile/PaitentProfile";
import { FamilyMembers } from "./PatientPages/FamilyMember/FamilyMembers";
import { BookAppoinment } from "./PatientPages/BookAppointment/BookAppoinment";
import { MyAppointments } from "./PatientPages/MyAppointments/MyAppointments";


//login page
import MainLogin from "./LoginRegister Pages/MainLogin";
import RegisterPage from "./LoginRegister Pages/RegisterPage";

//otp page
import OTPForm from "./LoginRegister Pages/OTPForm";
//import TreatmentRecords from "./pages/TreatmentRecords";

//Admin page

import { AdminLayout } from "./Layouts/Admin.Layout";


import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import BillingPage from "./pages/BillingPage";
import InventoryPage from "./pages/InventoryPage";
import AppointmentPage from "./pages/AppointmentPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route> 
        {/* </Route> */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<AppDashboard />} />
          <Route path="records" element={<h1>sfgdsfdf</h1>} />
          <Route path="medicines" element={<DoctorMedicines />} />
        </Route>
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<MainInterface />} />
          <Route path="family" element={<FamilyMembers />} />
          <Route path="bookappointments" element={<BookAppoinment />} />
          <Route path="myappointments" element={<MyAppointments />} />
        </Route>
        <Route path="/login" element={<MainLogin />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OTPForm/>} />
      </Routes>
       <Routes>
        {/* Admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
        </Route>
        
      </Routes>

    {/* ✅ ADD THIS LINE (GLOBAL CHATBOT) */}
      <ChatbotWidget />

    </BrowserRouter>
  );
}


export default App;




