export default function Table({ headers, children, className = '' }) {
  return (
    <div className={`overflow-x-auto bg-gray-900 rounded-lg border border-gray-800 shadow-lg ${className}`}>
      <table className="min-w-full text-sm">
        <thead className="bg-red-600 border-b border-gray-700">
          <tr>
            {headers.map((h) => (
              <th 
                key={h} 
                className="text-left px-4 py-3.5 font-semibold text-white text-xs uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-900">
          {children}
        </tbody>
      </table>
    </div>
  )
}