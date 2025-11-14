import Table from '../../components/Table'

const shifts = ['MORNING', 'EVENING', 'NIGHT']

export default function RosterTable({ roster }) {
  if (!roster) return null

  const getMembersForShift = (day, shift) => {
    const entry = (roster.entries || []).find(e => e.day === day && e.shift === shift)
    return entry ? (entry.memberNames || []) : []
  }

  const getShiftColor = (shift) => {
    switch (shift) {
      case 'MORNING': return 'bg-red-900 text-red-100 border-red-700'
      case 'EVENING': return 'bg-blue-900 text-blue-100 border-blue-700'
      case 'NIGHT': return 'bg-purple-900 text-purple-100 border-purple-700'
      default: return 'bg-gray-700 text-gray-100'
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return {
      full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <Table headers={['Date', 'Morning Shift (08:00-16:00)', 'Evening Shift (16:00-00:00)', 'Night Shift (00:00-08:00)']}>
      {roster.days?.map(day => {
        const dateInfo = formatDate(day)
        return (
          <tr key={day} className="hover:bg-gray-750 transition-colors duration-150">
            <td className="px-4 py-3.5 font-semibold text-white border-r border-gray-700">
              <div>{dateInfo.full}</div>
              <div className="text-sm text-gray-400 font-normal">{dateInfo.short}</div>
            </td>
            <td className="px-4 py-3.5">
              <div className="space-y-1">
                {getMembersForShift(day, 'MORNING').map((member, idx) => (
                  <span 
                    key={idx}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getShiftColor('MORNING')} mr-1 mb-1`}
                  >
                    {member}
                  </span>
                ))}
                {getMembersForShift(day, 'MORNING').length === 0 && (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </div>
            </td>
            <td className="px-4 py-3.5">
              <div className="space-y-1">
                {getMembersForShift(day, 'EVENING').map((member, idx) => (
                  <span 
                    key={idx}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getShiftColor('EVENING')} mr-1 mb-1`}
                  >
                    {member}
                  </span>
                ))}
                {getMembersForShift(day, 'EVENING').length === 0 && (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </div>
            </td>
            <td className="px-4 py-3.5">
              <div className="space-y-1">
                {getMembersForShift(day, 'NIGHT').map((member, idx) => (
                  <span 
                    key={idx}
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getShiftColor('NIGHT')} mr-1 mb-1`}
                  >
                    {member}
                  </span>
                ))}
                {getMembersForShift(day, 'NIGHT').length === 0 && (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </div>
            </td>
          </tr>
        )
      })}
    </Table>
  )
}