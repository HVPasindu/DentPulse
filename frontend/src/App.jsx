import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatbotWidget from "./chatbot/ChatbotWidget";
import Layout from "./Layout";

// Home
import Home from "./pages/Home";

// Doctor
import { DoctorLayout } from "./Layouts/Doctor.Layout";
import AppDashboard from "./pages/AppDashboard";
import DoctorMedicines from "./pages/DoctorMedicines";
import PatientTreatmentRecords from "./pages/PatientTreatmentRecords";
import DoctorNotes from "./pages/DoctorNotes";

// Patient
import { PatientLayout } from "./Layouts/Patient.Layout";
import MainInterface from "./PatientPages/MyProfile/PaitentProfile";
import { FamilyMembers } from "./PatientPages/FamilyMember/FamilyMembers";
import { BookAppoinment } from "./PatientPages/BookAppointment/BookAppoinment";
import { MyAppointments } from "./PatientPages/MyAppointments/MyAppointments";
import { PatientIdCard } from "./PatientPages/MyProfile/PatientIdCard";
// Auth
import MainLogin from "./LoginRegister Pages/MainLogin";
import RegisterPage from "./LoginRegister Pages/RegisterPage";
import OTPForm from "./LoginRegister Pages/OTPForm";

// Admin
import { AdminLayout } from "./Layouts/Admin.Layout";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import BillingPage from "./pages/BillingPage";
import InventoryPage from "./pages/InventoryPage";
import AppointmentPage from "./pages/AppointmentPage";
import AdminQrScanner from "./Admin/AdminQrScanner";

//protected route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<MainLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OTPForm />} />

        {/* ================= DOCTOR ================= */}

        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<AppDashboard />} />
          <Route path="records" element={<PatientTreatmentRecords />} />
          <Route path="medicines" element={<DoctorMedicines />} />
           <Route path="notes" element={<DoctorNotes />} />
        </Route>
          <Route path="/doctor/admin/billing" element={<BillingPage  />}>
        </Route>
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<MainInterface />} />
          <Route path="family" element={<FamilyMembers />} />
          <Route path="bookappointments" element={<BookAppoinment />} />
          <Route path="myappointments" element={<MyAppointments />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path=":id" element={<PatientIdCard />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="appointment" element={<AppointmentPage />} />
          <Route path="qr" element={<AdminQrScanner />} />
        </Route>

      </Routes>

      {/* Global chatbot */}
      <ChatbotWidget />
    </BrowserRouter>
  );
}

export default App;





