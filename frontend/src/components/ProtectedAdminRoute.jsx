import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");
  console.log("ProtectedAdminRoute running");

// Use .trim() and .toUpperCase() to avoid "invisible" mismatches
if (!token || role?.trim().toUpperCase() !== "ADMIN") {
  console.log("Access denied. Found role:", role);
  return <Navigate to="/login" />;
}

  return children;
};

export default ProtectedAdminRoute;

