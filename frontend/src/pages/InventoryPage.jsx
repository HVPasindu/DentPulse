import { useState, useEffect } from 'react'
import { Plus, Package, AlertTriangle } from 'lucide-react'
import Swal from 'sweetalert2'
import StatsCard from '../Admin/StatsCard'
import SearchBar from '../Admin/SearchBar'
import InventoryTable from '../Admin/InventoryTable'
import ItemDialog from '../Admin/ItemDialog'
import { useLocation } from 'react-router-dom'

// Import the new named exports including Stats and Search
import { 
  fetchAllInventory, 
  createInventoryItem, 
  updateInventoryItem, 
  deleteInventoryItem,
  fetchInventoryStats,   
  searchInventoryItems   
} from '../api/inventoryApi'

export default function InventoryDashboard() {
  const location = useLocation()
  const [inventoryData, setInventoryData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  
  // New State for Backend Stats
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalValue: 0
  })

  // Updated formData to include brand, expiryDate, and medicine fields
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    minStock: 0,
    unit: '',
    price: 0,
    brand: '',
    expiryDate: '',
    medicineId: '',
    medicineStatus: 'In Stock'
  })

  // --- REFRESH DATA (Updated to fetch Stats and List from Backend) ---
  const loadData = async () => {
    try {
      const [inventoryRes, statsRes] = await Promise.all([
        fetchAllInventory(),
        fetchInventoryStats()
      ]);
      setInventoryData(inventoryRes.data);
      setStats({
      totalItems: statsRes.data.totalItems || 0,
      lowStockCount: statsRes.data.lowStockCount || 0,
      outOfStockCount: statsRes.data.outOfStockCount || 0,
      totalValue: statsRes.data.totalValue || 0
    });
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- NEW SEARCH HANDLER (Server-side Search) ---
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    try {
      if (value.trim() === "") {
        const response = await fetchAllInventory();
        setInventoryData(response.data);
      } else {
        const response = await searchInventoryItems(value);
        setInventoryData(response.data);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

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
      brand: '',
      expiryDate: '',
      medicineId: '',
      medicineStatus: 'In Stock'
    })
    setIsDialogOpen(true)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setFormData({ ...item }) 
    setIsDialogOpen(true)
  }

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      if (editingItem) {
        await updateInventoryItem(editingItem.id, formData);
      } else {
        await createInventoryItem(formData);
      }
      
      await loadData(); 
      setIsDialogOpen(false);
      Swal.fire({
        title: "Success!",
        text: `Item ${editingItem ? 'updated' : 'added'} successfully!`,
        icon: "success",
        confirmButtonColor: "#16a34a",
      });
    } catch (error) {
      Swal.fire("Error", "Action failed", "error");
    }
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteInventoryItem(id);
          await loadData();
          Swal.fire("Deleted!", "Item removed.", "success");
        } catch (error) {
          Swal.fire("Error", "Delete failed", "error");
        }
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Inventory Management</h1>
            <p className="mt-2 text-sm text-slate-500 font-medium sm:text-base">Manage dental supplies</p>
          </div>
          <button onClick={handleAddItem} className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-green-100 hover:bg-green-700 active:scale-95 uppercase tracking-tighter">
            <Plus className="h-4 w-4" /> Add Item
          </button>
        </div>

        {/* --- STATS CARDS (Updated to use dynamic 'stats' from backend) --- */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Items" value={stats.totalItems} icon={Package} color="purple" subtitle="Across all categories" />
          <StatsCard title="Low Stock Items" value={stats.lowStockCount} icon={AlertTriangle} color="red" subtitle="Require restocking" />
          <StatsCard title="Out of Stock" value={stats.outOfStockCount} icon={AlertTriangle} color="gray" subtitle="No units available" />
          <StatsCard title="Total Value" value={`LKR ${stats.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={Package} color="green" subtitle="Current value" />
        </div>

        <div className="rounded-xl bg-white border border-green-100 shadow-sm overflow-hidden">
          <div className="border-b border-green-50 p-4 bg-white">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-800">Inventory List</h2>
              {/* SearchBar updated with backend search handler */}
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </div>
          </div>
          <div className="bg-white">
            {/* Table uses inventoryData directly (filtered by backend) */}
            <InventoryTable items={inventoryData} onEdit={handleEditItem} onDelete={handleDelete} />
          </div>
        </div>
      </div>

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