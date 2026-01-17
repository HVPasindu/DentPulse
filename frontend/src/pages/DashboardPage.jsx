import { useState, useEffect } from 'react'
import DashboardQuickActions from '../Admin/DashboardQuickActions'
import DashboardRecentAppointments from '../Admin/DashboardRecentAppoinments'

const initialPatients = [
  {
    id: 'PT-001',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    phone: '+1 (555) 123-4567',
    email: 'sarah.j@email.com',
    address: '123 Main St, New York, NY',
    lastVisit: '2024-01-15',
    status: 'Active',
    hasNIC: 'yes',
    nicNumber: '1234567890123',
    treatments: [
      { id: 1, date: '2024-01-15', procedure: 'Dental Cleaning', cost: 150 },
      { id: 2, date: '2023-12-10', procedure: 'Filling', cost: 200 },
    ],
    billing: [
      { id: 1, date: '2024-01-15', description: 'Dental Cleaning', amount: 150, status: 'Paid' },
      { id: 2, date: '2023-12-10', description: 'Filling', amount: 200, status: 'Paid' },
    ]
  },
  {
    id: 'PT-002',
    name: 'James Wilson',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 234-5678',
    email: 'james.w@email.com',
    address: '456 Oak Ave, Los Angeles, CA',
    lastVisit: '2024-01-18',
    status: 'Active',
    hasNIC: 'no',
    nicNumber: '',
    treatments: [
      { id: 1, date: '2024-01-18', procedure: 'Root Canal', doctor: 'Dr. Brown', cost: 800 },
    ],
    billing: [
      { id: 1, date: '2024-01-18', description: 'Root Canal', amount: 800, status: 'Pending' },
    ]
  },
  {
    id: 'PT-003',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    phone: '+1 (555) 345-6789',
    email: 'emily.d@email.com',
    address: '789 Pine Rd, Chicago, IL',
    lastVisit: '2023-12-20',
    status: 'Inactive',
    hasNIC: 'yes',
    nicNumber: '9876543210987',
    treatments: [
      { id: 1, date: '2023-12-20', procedure: 'Teeth Whitening', doctor: 'Dr. Lee', cost: 300 },
    ],
    billing: [
      { id: 1, date: '2023-12-20', description: 'Teeth Whitening', amount: 300, status: 'Paid' },
    ]
  },
  {
    id: 'PT-004',
    name: 'Michael Brown',
    age: 38,
    gender: 'Male',
    phone: '+1 (555) 456-7890',
    email: 'michael.b@email.com',
    address: '321 Elm St, Houston, TX',
    lastVisit: '2024-01-22',
    status: 'Active',
    hasNIC: 'yes',
    nicNumber: '5555555555555',
    treatments: [
      { id: 1, date: '2024-01-22', procedure: 'Crown Placement', doctor: 'Dr. Smith', cost: 1200 },
    ],
    billing: [
      { id: 1, date: '2024-01-22', description: 'Crown Placement', amount: 1200, status: 'Paid' },
    ]
  },
]

const initialInventoryData = [
  {
    id: 1,
    name: 'Dental Gloves (Box)',
    sku: 'DG-001',
    category: 'PPE',
    quantity: 5,
    minStock: 10,
    unit: 'box',
    price: 25.0,
  },
  {
    id: 2,
    name: 'Surgical Masks',
    sku: 'SM-002',
    category: 'PPE',
    quantity: 150,
    minStock: 50,
    unit: 'pcs',
    price: 0.5,
  },
  {
    id: 3,
    name: 'Anesthetic Cartridges',
    sku: 'AC-003',
    category: 'Anesthesia',
    quantity: 8,
    minStock: 20,
    unit: 'box',
    price: 45.0,
  },
  {
    id: 4,
    name: 'Dental Burs Set',
    sku: 'DB-004',
    category: 'Instruments',
    quantity: 25,
    minStock: 15,
    unit: 'set',
    price: 85.0,
  },
  {
    id: 5,
    name: 'Composite Resin',
    sku: 'CR-005',
    category: 'Materials',
    quantity: 12,
    minStock: 10,
    unit: 'unit',
    price: 120.0,
  },
  {
    id: 6,
    name: 'Cotton Rolls',
    sku: 'CT-006',
    category: 'Consumables',
    quantity: 3,
    minStock: 15,
    unit: 'bag',
    price: 12.0,
  },
  {
    id: 7,
    name: 'Impression Material',
    sku: 'IM-007',
    category: 'Materials',
    quantity: 18,
    minStock: 8,
    unit: 'unit',
    price: 95.0,
  },
  {
    id: 8,
    name: 'Suction Tips',
    sku: 'ST-008',
    category: 'Consumables',
    quantity: 50,
    minStock: 25,
    unit: 'pcs',
    price: 2.0,
  },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [patients, setPatients] = useState(initialPatients)
  const [appointments, setAppointments] = useState([])
  const [inventoryItems, setInventoryItems] = useState(initialInventoryData)
  const [billings, setBillings] = useState([])

  // Load appointments from localStorage and listen for changes
  useEffect(() => {
    const loadAppointments = () => {
      const saved = localStorage.getItem("app_appointments")
      if (saved) {
        const data = JSON.parse(saved)
        setAppointments(data)
        // Also set billings from appointments
        setBillings(data)
      }
    }

    loadAppointments()

    // Listen for storage changes (when AppointmentPage updates)
    window.addEventListener('storage', loadAppointments)
    // Also listen for focus to reload when tab becomes active
    window.addEventListener('focus', loadAppointments)

    return () => {
      window.removeEventListener('storage', loadAppointments)
      window.removeEventListener('focus', loadAppointments)
    }
  }, [])

  return (
    <div className="min-h-screen flex bg-cyan-50">
    
      
      <div className="flex-1 flex flex-col min-w-0">
       

        
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>

         
          <DashboardQuickActions 
            patients={patients}
            appointments={appointments}
            inventoryItems={inventoryItems}
            billings={billings}
          />
          <DashboardRecentAppointments />

         
        </main>
      </div>
    </div>
  )
}