import { useState } from 'react'


export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
     <div className="w-64 bg-gray-200 p-4">Sidebar Placeholder</div>
      
      <div className="flex-1 flex flex-col min-w-0">
       <div className="w-64 bg-gray-200 p-4">Header Placeholder</div>

        
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

         
        </main>
      </div>
    </div>
  )
}