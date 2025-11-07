export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto bg-white rounded border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {headers.map(h => <th key={h} className="text-left px-3 py-2">{h}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
