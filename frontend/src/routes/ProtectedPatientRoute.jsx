import { Navigate } from "react-router-dom";

const ProtectedPatientRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  console.log("ProtectedPatientRoute running");

  // Check authentication and role
  if (!token || role?.trim().toUpperCase() !== "PATIENT") {
    console.log("Patient access denied. Found role:", role);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedPatientRoute;