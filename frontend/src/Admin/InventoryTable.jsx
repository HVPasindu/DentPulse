import { Edit, Trash2, AlertTriangle, Package } from 'lucide-react'

export default function InventoryTable({ items, onEdit, onDelete }) {
  const categoryTotals = items.reduce((acc, it) => {
    const qty = Number(it.quantity) || 0
    acc[it.category] = (acc[it.category] || 0) + qty
    return acc
  }, {})

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-green-100 bg-white">
      <table className="w-full table-auto">
        <thead className="bg-green-50 text-green-700 uppercase text-[11px] font-black tracking-widest border-b border-green-100">
          <tr>
            <th className="px-6 py-4 text-left">Item Name</th>
            <th className="px-6 py-4 text-left">SKU</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-right">Quantity</th>
            <th className="px-6 py-4 text-right">Min Stock</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Unit Price</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-50">
          {items && items.length > 0 ? (
            items.map((item) => {
              const catTotal = categoryTotals[item.category] ?? 0
              const isCategoryEmpty = catTotal === 0
              const isOutOfStock = isCategoryEmpty || Number(item.quantity) === 0
              const isLowStock = !isOutOfStock && item.quantity < item.minStock
              return (
                <tr key={item.id} className="transition-colors hover:bg-green-50/50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-bold text-slate-800">{item.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-xs text-slate-500 font-bold font-mono">{item.sku}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-md bg-purple-100 px-2.5 py-1 text-[10px] font-black text-purple-700 uppercase tracking-tight border border-purple-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className={`text-sm font-black ${isLowStock ? 'text-red-600' : 'text-slate-800'}`}>
                      {item.quantity} <span className="text-[10px] text-slate-400 font-bold uppercase">{item.unit}</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="text-sm text-slate-400 font-bold">{item.minStock}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 text-[10px] font-black text-slate-700 uppercase border border-slate-300">
                        <AlertTriangle className="h-3 w-3" /> Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-[10px] font-black text-red-700 uppercase border border-red-200">
                        <AlertTriangle className="h-3 w-3" /> Limited
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-[10px] font-black text-white uppercase border border-green-600">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="text-sm font-black text-slate-800">
                      LKR {(item.price || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => onEdit(item)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-green-100 hover:text-green-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(item.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-20 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="bg-slate-50 p-4 rounded-full">
                    <Package className="h-10 w-10 text-slate-200" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 uppercase">No items found</p>
                    <p className="text-xs text-slate-400 font-bold">The server might be blocked or the database is empty.</p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}