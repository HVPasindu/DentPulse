import { useState, useEffect } from 'react'
import { Plus, Package, AlertTriangle } from 'lucide-react'
import StatsCard from '../Admin/StatsCard'
import SearchBar from '../Admin/SearchBar'
import InventoryTable from '../Admin/InventoryTable'
import ItemDialog from '../Admin/ItemDialog'

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
    name: 'X-Ray Films',
    sku: 'XR-008',
    category: 'Imaging',
    quantity: 45,
    minStock: 30,
    unit: 'pack',
    price: 55.0,
  },
]

import { useLocation } from 'react-router-dom'

export default function InventoryDashboard() {
  const location = useLocation()
  const [inventoryData, setInventoryData] = useState(initialInventoryData)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    minStock: 0,
    unit: '',
    price: 0,
  })

  // Filter inventory based on search query
  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate low stock items
  const lowStockCount = inventoryData.filter((item) => item.quantity < item.minStock).length

  // Calculate total inventory value
  const totalValue = inventoryData.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const handleAddItem = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: 0,
      minStock: 0,
      unit: '',
      price: 0,
    })
    setIsDialogOpen(true)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      quantity: item.quantity,
      minStock: item.minStock,
      unit: item.unit,
      price: item.price,
    })
    setIsDialogOpen(true)
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      setInventoryData(
        inventoryData.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item,
        ),
      )
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...inventoryData.map((i) => i.id), 0) + 1,
        ...formData,
      }
      setInventoryData([...inventoryData, newItem])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventoryData(inventoryData.filter((item) => item.id !== id))
    }
  }

  useEffect(() => {
    if (location?.state?.openAdd) {
      setIsDialogOpen(true)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Manage dental supplies and equipment
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Items"
            value={inventoryData.length}
            icon={Package}
            color="blue"
            subtitle="Across all categories"
          />
          <StatsCard
            title="Low Stock Items"
            value={lowStockCount}
            icon={AlertTriangle}
            color="red"
            subtitle="Require restocking"
          />
          <StatsCard
            title="Total Value"
            value={`LKR ${totalValue.toFixed(2)}`}
            icon={Package}
            color="green"
            subtitle="Current inventory value"
          />
        </div>

        {/* Inventory Table */}
        <div className="rounded-xl  bg- tranparent ">
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Inventory List</h2>
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <InventoryTable
            items={filteredInventory}
            onEdit={handleEditItem}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Item Dialog */}
      <ItemDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        editingItem={editingItem}
        formData={formData}
        onFormChange={handleFormChange}
      />
    </div>
  )
}