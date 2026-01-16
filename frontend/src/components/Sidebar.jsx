import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: 'Dashboard', href: '/doctor' },
  { name: 'Record', href: '/doctor/records' },
  { name: 'Medicines', href: '/doctor/medicines' },
  { name: 'Billing', href: 'admin/billing' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-xl flex flex-col justify-between fixed top-0 left-0 z-10">
      <div>
        {/* Logo/Header Area */}
        <div className="flex items-center justify-center h-20 bg-green-50 border-b border-gray-200">
          <span className="ml-2 text-xl font-bold text-green-600 ">Doctor Console</span>
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
                  flex items-center px-4 py-2 text-sm rounded-lg transition duration-150 ease-in-out
                  ${isActive
                    ? 'bg-green-200 text-green-600 font-bold border-l-4 border-green-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-medium'
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        {/* User Profile Card */}
        <div className="flex items-center p-3 mb-4 rounded-lg bg-purple-100">
          <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-white font-bold text-sm">
            D
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">Doctor</p>
            <p className="text-xs text-green-500">online</p>
          </div>
        </div>

        {/* Sign Out Button */}
        <a
          href="#"
          className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg text-black bg-green-200 hover:bg-green-400 transition duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
