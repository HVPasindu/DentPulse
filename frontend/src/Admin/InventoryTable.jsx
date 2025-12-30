import { Edit, Trash2, AlertTriangle, Package } from 'lucide-react'

export default function InventoryTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-slate-200 bg-cyan-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Category
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
              Quantity
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
              Min Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
              Unit Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {items.length > 0 ? (
            items.map((item) => {
              const isLowStock = item.quantity < item.minStock
              return (
                <tr
                  key={item.id}
                  className={`transition-colors hover:bg-slate-50 ${isLowStock ? 'bg-red-50/50' : ''}`}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{item.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-slate-600">{item.sku}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className={`text-sm font-semibold ${isLowStock ? 'text-red-600' : 'text-slate-900'}`}>
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="text-sm text-slate-600">{item.minStock}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {isLowStock ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                        <AlertTriangle className="h-3 w-3" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="text-sm font-medium text-slate-900">${item.price.toFixed(2)}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Edit item"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Delete item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Package className="h-12 w-12 text-slate-300" />
                  <p className="mt-2 text-sm font-medium text-slate-900">No items found</p>
                  <p className="mt-1 text-sm text-slate-500">Try adjusting your search query</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}