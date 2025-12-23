import { useState } from 'react'
import ToothIcon from '../Admin/ToothIcon'
import { LayoutDashboard, Calendar, Users, UserCog, DollarSign, Package, FileText, Settings, Bell, Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Appointments', icon: Calendar, href: '/appointments' },
  { name: 'Patients', icon: Users, href: '/patients' },
  { name: 'Dentists', icon: UserCog, href: '/dentists' },
  { name: 'Billing', icon: DollarSign, href: '/billing' },
  { name: 'Inventory', icon: Package, href: '/inventory' },
 
  { name: 'User Management', icon: Settings, href: '/users' },
  { name: 'Notifications', icon: Bell, href: '/notifications' },
]

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState('Dashboard')

  return (
    <>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

     
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
         
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <ToothIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">DentPulse</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

         
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.name
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-teal-700">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@dentpulse.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}