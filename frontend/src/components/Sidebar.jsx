import React from 'react';
import logo from '../assets/dentPulse_logob.png';
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: 'Dashboard', href: '/doctor', icon: HomeIcon },
  { name: 'Prescriptions', href: '/doctor/notes', icon: ClipboardDocumentListIcon }, // NEW
  { name: 'Past Records', href: '/doctor/records', icon: ClipboardDocumentListIcon },
  { name: 'Medicines', href: '/doctor/medicines', icon: BeakerIcon },
  { name: 'Weekly Revenue', href: '/doctor/weekly-revenue', icon: BanknotesIcon },

];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen shadow-xl flex flex-col justify-between fixed top-0 left-0 z-10">
      <div>
          {/* Logo/Header Area */}
          <div className="flex items-center justify-center h-20 bg-white/70 border-b border-green-100 backdrop-blur">
            {/* added logo + stacked text */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="leading-tight">
                <div className="text-xl font-bold text-green-700">Doctor Console</div>
                
              </div>
            </div>
          </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

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
                 {Icon && <Icon className="h-5 w-5 mr-3" />} {/* NEW: render icon */}
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
        <Link
          to="/" // NEW: navigate to homepage on sign-out click
          className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg text-black bg-green-200 hover:bg-green-400 transition duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
