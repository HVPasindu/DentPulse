import { Plus } from "lucide-react"

export default function InventoryHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-slate-600">Manage dental supplies and equipment</p>
      </div>
      <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Plus size={16} /> Add Item
      </button>
    </div>
  )
}
