const shifts = ['MORNING', 'EVENING', 'NIGHT']
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function RosterPreview({ roster }) {
  if (!roster) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-gray-500">📅</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Roster Generated</h3>
        <p className="text-gray-400 text-sm">Configure and generate a monthly roster using the form.</p>
      </div>
    )
  }

  // Get member names for a specific day and shift
  const getMembersForShift = (day, shift) => {
    const entry = (roster.entries || []).find(e => e.day === day && e.shift === shift)
    if (!entry) return []
    
    // Return member names instead of team code
    return entry.memberNames || []
  }

  // Get shift statistics
  const getShiftStats = () => {
    const stats = {}
    shifts.forEach(shift => {
      const memberAssignments = new Set()
      roster.days?.forEach(day => {
        const members = getMembersForShift(day, shift)
        members.forEach(member => memberAssignments.add(member))
      })
      stats[shift] = memberAssignments.size
    })
    return stats
  }

  const shiftStats = getShiftStats()

  // Group days by week for better display
  const groupDaysByWeek = () => {
    const weeks = []
    let currentWeek = []
    
    roster.days?.forEach((day, index) => {
      currentWeek.push(day)
      
      // Start new week after Saturday or at the end
      if (new Date(day).getDay() === 6 || index === roster.days.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
    })
    
    return weeks
  }

  const weeks = groupDaysByWeek()

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700 bg-red-600">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {roster.monthName} {roster.year} Roster
            </h3>
            <p className="text-sm text-red-100 mt-1">
              {roster.days?.length || 0} days • {roster.entries?.length || 0} assignments
            </p>
          </div>
          <div className="flex gap-6">
            {shifts.map(shift => (
              <div key={shift} className="text-center">
                <div className="font-bold text-white text-lg">{shiftStats[shift]}</div>
                <div className="text-red-100 text-xs">{shift}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Calendar View */}
      <div className="p-6">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="mb-6 last:mb-0">
            {/* Week header */}
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="text-center font-medium text-gray-400 text-sm">Shift</div>
              {week.map(day => {
                const date = new Date(day)
                return (
                  <div key={day} className="text-center">
                    <div className="font-semibold text-white text-sm">
                      {weekDays[date.getDay()]}
                    </div>
                    <div className="text-xs text-gray-400">
                      {date.getDate()}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Shift rows for the week */}
            {shifts.map(shift => (
              <div key={shift} className="grid grid-cols-8 gap-2 mb-3">
                <div className="flex items-center justify-end pr-2">
                  <span className="font-medium text-white text-sm bg-gray-700 px-2 py-1 rounded text-xs">
                    {shift}
                  </span>
                </div>
                {week.map(day => {
                  const members = getMembersForShift(day, shift)
                  return (
                    <div
                      key={`${day}-${shift}`}
                      className={`p-2 rounded border text-center min-h-12 ${
                        members.length > 0
                          ? 'bg-red-900 text-red-100 border-red-700'
                          : 'bg-gray-700 text-gray-400 border-gray-600'
                      }`}
                    >
                      {members.length > 0 ? (
                        <div className="space-y-1">
                          {members.map((member, idx) => (
                            <div key={idx} className="text-xs leading-tight">
                              {member}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs">—</span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-6 py-4 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">
            Total assignments: <span className="font-semibold text-white">{roster.entries?.length || 0}</span>
            <span className="mx-2">•</span>
            Days in month: <span className="font-semibold text-white">{roster.days?.length || 0}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-700 border border-red-500 rounded"></div>
              <span className="text-gray-400">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-600 border border-gray-500 rounded"></div>
              <span className="text-gray-400">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}