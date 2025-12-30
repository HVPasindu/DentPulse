import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Record', href: '/records' },
  { name: 'Medicines', href: '/doctor-medicines' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-xl flex flex-col justify-between fixed top-0 left-0 z-10">
      
      <div>
        {/* Logo/Header Area */}
        <div className="flex items-center justify-center h-20 bg-white border-b border-gray-200">
          <span className="ml-2 text-xl font-bold text-gray-800">Doctor Console</span>
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
                    ? 'bg-cyan-100 text-cyan-600 font-bold border-l-4 border-cyan-500'
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
        <div className="flex items-center p-3 mb-4 rounded-lg bg-purple-50">
          <div className="flex items-center justify-center w-10 h-10 bg-cyan-500 rounded-full text-white font-bold text-sm">
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
          className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg text-black bg-cyan-100 hover:bg-cyan-200 transition duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
