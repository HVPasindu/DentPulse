import { useState } from "react"
import InventoryHeader from "./Admin/InventoryHeader"
import InventoryStats from "./Admin/InventoryStats"
import InventoryTable from "./Admin/InventoryTable"
import InventoryDialog from "./Admin/InventoryDialog"

const initialInventoryData = [
  { id: 1, name: "Dental Gloves (Box)", sku: "DG-001", category: "PPE", quantity: 5, minStock: 10, unit: "box", price: 25 },
  { id: 2, name: "Surgical Masks", sku: "SM-002", category: "PPE", quantity: 150, minStock: 50, unit: "pcs", price: 0.5 },
  { id: 3, name: "Anesthetic Cartridges", sku: "AC-003", category: "Anesthesia", quantity: 8, minStock: 20, unit: "box", price: 45 },
  { id: 4, name: "Dental Burs Set", sku: "DB-004", category: "Instruments", quantity: 25, minStock: 15, unit: "set", price: 85 },
  { id: 5, name: "Composite Resin", sku: "CR-005", category: "Materials", quantity: 12, minStock: 10, unit: "unit", price: 120 },
  { id: 6, name: "Cotton Rolls", sku: "CT-006", category: "Consumables", quantity: 3, minStock: 15, unit: "bag", price: 12 },
  { id: 7, name: "Impression Material", sku: "IM-007", category: "Materials", quantity: 18, minStock: 8, unit: "unit", price: 95 },
  { id: 8, name: "X-Ray Films", sku: "XR-008", category: "Imaging", quantity: 45, minStock: 30, unit: "pack", price: 55 },
]

export default function InventoryPage() {
  const [inventoryData, setInventoryData] = useState(initialInventoryData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const lowStockCount = inventoryData.filter(i => i.quantity < i.minStock).length

  const handleSave = (item) => {
    if (editingItem) {
      setInventoryData(
        inventoryData.map((i) => (i.id === editingItem.id ? { ...item, id: i.id } : i))
      )
    } else {
      setInventoryData([...inventoryData, { ...item, id: Date.now() }])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setInventoryData(inventoryData.filter((i) => i.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <InventoryHeader onAdd={() => { setEditingItem(null); setIsDialogOpen(true) }} />

      <InventoryStats
        total={inventoryData.length}
        lowStock={lowStockCount}
        totalValue={inventoryData.reduce((s, i) => s + i.quantity * i.price, 0)}
      />

      <InventoryTable
        items={filteredInventory}
        search={searchQuery}
        setSearch={setSearchQuery}
        onEdit={(item) => { setEditingItem(item); setIsDialogOpen(true) }}
        onDelete={handleDelete}
      />

      {isDialogOpen && (
        <InventoryDialog
          item={editingItem}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
