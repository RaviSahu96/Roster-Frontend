import Table from "../../components/Table"

const shifts = ["MORNING", "EVENING", "NIGHT"]

export default function RosterTable({ roster, teamMap }) {
  if (!roster) return null

  const days = [...new Set(roster.entries.map(e => e.date))].sort()

  const getMembers = (date, shift) => {
    const entry = roster.entries.find(
      e => e.date === date && e.shift === shift
    )
    if (!entry) return []

    const tm = teamMap[entry.teamCode]
    if (!tm) return []

    let all = [...tm.members]
    if (tm.backup) all.push(`(Backup) ${tm.backup}`)

    return all
  }

  const formatDate = d => {
    const dt = new Date(d)
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <Table
      headers={[
        "Date",
        "Morning Shift",
        "Evening Shift",
        "Night Shift"
      ]}
    >
      {days.map(date => (
        <tr key={date} className="hover:bg-gray-750 transition-all">
          <td className="px-4 py-3.5 text-white border-r border-gray-700">
            {formatDate(date)}
          </td>

          {shifts.map(shift => {
            const members = getMembers(date, shift)
            return (
              <td
                key={shift}
                className="px-4 py-3.5 text-white"
              >
                {members.length ? (
                  <div className="space-y-1">
                    {members.map((m, i) => (
                      <div
                        key={i}
                        className="inline-block bg-gray-700 text-white px-2 py-1 rounded text-xs mr-1 mb-1"
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </Table>
  )
}
