import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign, 
  Package, 
  X, 
  IdCardLanyard, 
  LogOut 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { name: 'Appointments', icon: Calendar, href: '/admin/appointment' },
  { name: 'Patients', icon: Users, href: '/admin/patients' },
  { name: 'Billing', icon: DollarSign, href: '/admin/billing' },
  { name: 'Inventory', icon: Package, href: '/admin/inventory' },
  { name: 'QR Scanner', icon: IdCardLanyard, href: '/admin/qr' },
];

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div>
          {/* Logo/Header Area - Matches Doctor Console style */}
          <div className="flex items-center justify-between h-20 bg-green-50 border-b border-gray-200 px-6">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-600">DentPulse</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center px-4 py-2 text-sm rounded-lg transition duration-150 ease-in-out
                    ${isActive
                      ? 'bg-green-200 text-green-600 font-bold border-l-4 border-green-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 font-medium'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-100">
          {/* User Profile Card - Matches Purple style */}
          <div className="flex items-center p-3 mb-4 rounded-lg bg-purple-100">
            <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-white font-bold text-sm">
              AD
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">Admin</p>
              <p className="text-xs text-green-500">online</p>
            </div>
          </div>

          {/* Sign Out Button - Matches Doctor style */}
          <button
            onClick={() => {/* Handle Logout */}}
            className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg text-black bg-green-200 hover:bg-green-400 transition duration-150 ease-in-out"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}