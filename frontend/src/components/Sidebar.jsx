import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Record', href: '#', current: false },
    { name: 'Medicines', href: '#', current: false },
];

const Sidebar = () => {
  return (
 
    <div className="w-64 bg-white h-screen shadow-xl flex flex-col justify-between fixed top-0 left-0 z-10">
      
    
      <div>
        {/* Logo/Header Area */}
        <div className="flex items-center justify-center h-20 bg-white border-b border-gray-100">
          {/* <img className="h-10 w-auto" src="/petcarepro_logo.png" alt="PetCarePro Admin Console" /> */}
          <span className="ml-2 text-xl font-bold text-gray-800">Doctor Console</span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
             
              className={`
                flex items-center px-4 py-2 text-sm font-medium rounded-lg transition duration-150 ease-in-out
                ${item.current
                  ? 'bg-purple-100 text-purple-700 font-semibold border-l-4 border-purple-700' // Active: වම් පැත්තේ තීරුවක් එකතු කරමු
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' // Inactive
                }
              `}
            >
              
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      
      <div className="p-4 border-t border-gray-100">
        
        {/* User Profile Card */}
        <div className="flex items-center p-3 mb-4 rounded-lg bg-purple-50">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-700 rounded-full text-white font-bold text-sm">
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
          className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition duration-150 ease-in-out"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Sign Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;