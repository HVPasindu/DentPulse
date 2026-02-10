import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ItemDialog({ isOpen, onClose, onSave, editingItem, formData, onFormChange }) {
  // Local state to track validation errors
  const [errors, setErrors] = useState({})

  // Reset errors when the dialog opens or closes
  useEffect(() => {
    setErrors({})
  }, [isOpen])

  if (!isOpen) return null

  const validate = () => {
    const newErrors = {}
    if (!formData.name?.trim()) newErrors.name = "Item name is required"
    if (!formData.sku?.trim()) newErrors.sku = "SKU is required"
    if (!formData.category?.trim()) newErrors.category = "Category is required"
    if (formData.quantity < 0) newErrors.quantity = "Cannot be negative"
    if (formData.minStock < 0) newErrors.minStock = "Cannot be negative"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveAttempt = () => {
    if (validate()) {
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog Content */}
      <div className="relative z-50 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {editingItem ? 'Update the item details below.' : 'Enter the details for the new inventory item.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Item Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => onFormChange('name', e.target.value)}
              placeholder="e.g., Dental Gloves"
              className={`mt-1 w-full rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* SKU */}
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-slate-700">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              value={formData.sku}
              onChange={(e) => onFormChange('sku', e.target.value)}
              placeholder="e.g., DG-001"
              className={`mt-1 w-full rounded-lg border ${errors.sku ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
            {errors.sku && <p className="mt-1 text-xs text-red-500">{errors.sku}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) => onFormChange('category', e.target.value)}
              placeholder="e.g., PPE"
              className={`mt-1 w-full rounded-lg border ${errors.category ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min={0}
                step={1}
                value={formData.quantity}
                onChange={(e) => onFormChange('quantity', Math.max(0, Number(e.target.value))) }
                className={`mt-1 w-full rounded-lg border ${errors.quantity ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
            </div>
            {/* Min Stock */}
            <div>
              <label htmlFor="minStock" className="block text-sm font-medium text-slate-700">
                Min Stock
              </label>
              <input
                id="minStock"
                type="number"
                min={0}
                step={1}
                value={formData.minStock}
                onChange={(e) => onFormChange('minStock', Math.max(0, Number(e.target.value))) }
                className={`mt-1 w-full rounded-lg border ${errors.minStock ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.minStock && <p className="mt-1 text-xs text-red-500">{errors.minStock}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Unit */}
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-slate-700">
                Unit
              </label>
              <input
                id="unit"
                type="text"
                value={formData.unit}
                onChange={(e) => onFormChange('unit', e.target.value)}
                placeholder="e.g., box, pcs"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">
                Price (LKR)
              </label>
              <input
                id="price"
                type="number"
                min={0}
                step="1"
                value={formData.price}
                onChange={(e) => onFormChange('price', Math.max(0, Number(e.target.value))) }
                className={`mt-1 w-full rounded-lg border ${errors.price ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} bg-white px-3 py-2 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAttempt}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  )
}