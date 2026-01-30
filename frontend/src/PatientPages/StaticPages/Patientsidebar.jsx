import React from "react";
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";
import { User, Users, Calendar, Clock } from 'lucide-react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: 'My Profile', href: '/patient',icon:<User  className="size-6 "/>},
  { name: 'Family Members', href: '/patient/family', icon:<Users className="size-6"/>},
  { name: 'Make An Appointment', href: '/patient/bookappointments', icon:<Calendar className="size-6"/> },
  { name: 'Appointments', href: '/patient/myappointments' , icon:<Clock className="size-6"/>},
];
  
   
export const Patientsidebar = () => {
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#9ca3af",
    }).then((result) => {
      if (result.isConfirmed) {
        // clear auth data
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };


  return (
    <div>
      <div className="w-80  h-screen shadow-xl flex flex-col justify-between fixed top-0 left-0 z-10">
        <div>
          {/* Logo/Header Area */}
          <div className="flex items-center justify-center h-20  border-b border-gray-200">
            <span className="ml-2 text-2xl font-bold text-green-600 ">
              Patient Console
            </span>
            {/* <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          
        </div> */}
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                  flex items-center px-4 py-2 text-lg rounded-lg transition duration-150 ease-in-out
                  ${
                    isActive
                      ? "bg-green-200 text-green-600 font-bold border-l-4 border-green-500"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-medium"
                  }
                `}
                >
                    <div className="p-3">{item.icon}</div>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          {/* User Profile Card */}
          <div className="flex items-center p-3 mb-4 rounded-lg bg-green-50">
            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-white font-bold text-sm">
              
            </div>
            <div className="ml-3">
              <p className="text-xl font-semibold text-gray-900">Paitent</p>
              <p className="text-lg text-green-500">online</p>
            </div>
          </div>

          {/* Sign Out Button */}
<button
  onClick={handleLogout}
  className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg text-black bg-green-200 hover:bg-green-400 transition duration-150 ease-in-out"
>
  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
  Sign Out
</button>

        </div>
      </div>
    </div>
  );
};
