import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");
/*
  if (!token || role !== "ADMIN") {
    return <Navigate to="/login" />;
  }*/

  return children;
};

export default ProtectedAdminRoute;