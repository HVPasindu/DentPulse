import { useState, useEffect } from 'react'
import { Plus, Package, AlertTriangle } from 'lucide-react'
import Swal from 'sweetalert2'
import StatsCard from '../Admin/StatsCard'
import SearchBar from '../Admin/SearchBar'
import InventoryTable from '../Admin/InventoryTable'
import ItemDialog from '../Admin/ItemDialog'
import { useLocation } from 'react-router-dom'

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
      setInventoryData(
        inventoryData.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item,
        ),
      )
      Swal.fire({
        title: "Updated!",
        text: "Item updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a",
      })
    } else {
      const newItem = {
        id: Math.max(...inventoryData.map((i) => i.id), 0) + 1,
        ...formData,
      }
      setInventoryData([...inventoryData, newItem])
      Swal.fire({
        title: "Success!",
        text: "Item added successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a",
      })
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setInventoryData(inventoryData.filter((item) => item.id !== id))
        Swal.fire({
          title: "Deleted!",
          text: "Item has been deleted.",
          icon: "success",
          confirmButtonColor: "#16a34a",
        })
      }
    })
  }

  useEffect(() => {
    if (location?.state?.openAdd) {
      setIsDialogOpen(true)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Inventory Management</h1>
            <p className="mt-2 text-sm text-slate-500 font-medium sm:text-base">
              Manage dental supplies and equipment
            </p>
          </div>
          <button
            onClick={handleAddItem}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-green-100 transition-all hover:bg-green-700 focus:outline-none active:scale-95 sm:w-auto uppercase tracking-tighter cursor-pointer"
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
            color="purple"
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

        {/* Inventory Table Container */}
        <div className="rounded-xl bg-white border border-green-100 shadow-sm overflow-hidden">
          <div className="border-b border-green-50 p-4 bg-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-800">Inventory List</h2>
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white">
            <InventoryTable
              items={filteredInventory}
              onEdit={handleEditItem}
              onDelete={handleDelete}
            />
          </div>
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