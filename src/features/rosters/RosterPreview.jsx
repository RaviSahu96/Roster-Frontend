const shifts = ["MORNING", "EVENING", "NIGHT"]
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

export default function RosterPreview({ roster, teamMap }) {
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

  const days = [...new Set(roster.entries.map(e => e.date))].sort()

  const getWeeks = () => {
    const weeks = []
    let current = []

    days.forEach((d, idx) => {
      const dt = new Date(d)
      current.push(d)

      if (dt.getDay() === 6 || idx === days.length - 1) {
        weeks.push([...current])
        current = []
      }
    })

    return weeks
  }

  const weeks = getWeeks()

  // Convert teamCode → [members]
  const getMembers = (date, shift) => {
    const entry = roster.entries.find(
      e => e.date === date && e.shift === shift
    )
    if (!entry) return []

    const tm = teamMap[entry.teamCode]
    if (!tm) return []

    // Combine members + backup
    let all = [...tm.members]
    if (tm.backup) all.push(`(Backup) ${tm.backup}`)

    return all
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700 bg-red-600">
        <h3 className="text-lg font-semibold text-white">
          Monthly Roster — {roster.month}/{roster.year}
        </h3>
        <p className="text-sm text-red-100 mt-1">
          {days.length} days • {roster.entries.length} assignments
        </p>
      </div>

      <div className="p-6">
        {weeks.map((week, wi) => (
          <div key={wi} className="mb-6">

            {/* Week header */}
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="text-gray-400 text-sm text-center">Shift</div>
              {week.map(d => {
                const dt = new Date(d)
                return (
                  <div key={d} className="text-center">
                    <div className="text-white font-semibold text-sm">
                      {weekDays[dt.getDay()]}
                    </div>
                    <div className="text-gray-400 text-xs">{dt.getDate()}</div>
                  </div>
                )
              })}
            </div>

            {/* Shifts */}
            {shifts.map(shift => (
              <div key={shift} className="grid grid-cols-8 gap-2 mb-2">
                <div className="text-right pr-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-white">
                    {shift}
                  </span>
                </div>

                {week.map(date => {
                  const members = getMembers(date, shift)

                  return (
                    <div
                      key={`${date}-${shift}`}
                      className={`p-2 rounded text-center border min-h-12 ${
                        members.length
                          ? "bg-red-900 border-red-700 text-red-100"
                          : "bg-gray-700 border-gray-600 text-gray-300"
                      }`}
                    >
                      {members.length ? (
                        <div className="space-y-1">
                          {members.map((m, i) => (
                            <div key={i} className="text-xs">{m}</div>
                          ))}
                        </div>
                      ) : "—"}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
