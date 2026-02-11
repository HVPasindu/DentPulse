import { X, Save } from 'lucide-react'

export default function ItemDialog({ isOpen, onClose, onSave, editingItem, formData, onFormChange }) {
  if (!isOpen) return null;

  // Function to handle the save click to prevent default form behavior
  const handleSaveClick = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            <p className="text-sm text-slate-500 font-medium">Complete supply details</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-50 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Item Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none transition-all"
                value={formData.name || ''}
                onChange={(e) => onFormChange('name', e.target.value)}
                placeholder="Item name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">SKU</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold font-mono text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.sku || ''}
                onChange={(e) => onFormChange('sku', e.target.value)}
                placeholder="SKU-001"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Category</label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.category || ''}
                onChange={(e) => onFormChange('category', e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Consumables">Consumables</option>
                <option value="Instruments">Instruments</option>
                <option value="Medicine">Medicine</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Quantity</label>
              <input
                type="number"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.quantity || 0}
                onChange={(e) => onFormChange('quantity', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Min Stock Level</label>
              <input
                type="number"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.minStock || 0}
                onChange={(e) => onFormChange('minStock', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Price (LKR)</label>
              <input
                type="number"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.price || 0}
                onChange={(e) => onFormChange('price', parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Unit</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.unit || ''}
                onChange={(e) => onFormChange('unit', e.target.value)}
                placeholder="e.g., Box, PCS"
              />
            </div>

            {/* Always show Brand and Expiry to avoid state initialization issues */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Brand</label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.brand || ''}
                onChange={(e) => onFormChange('brand', e.target.value)}
                placeholder="Manufacturer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500">Expiry Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-green-500 focus:outline-none"
                value={formData.expiryDate || ''}
                onChange={(e) => onFormChange('expiryDate', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 p-6 bg-slate-50/50">
          <button 
            type="button"
            onClick={onClose} 
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveClick}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-black text-white shadow-lg hover:bg-green-700 active:scale-95 transition-all uppercase tracking-tighter"
          >
            <Save className="h-4 w-4" /> 
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  )
}