import Table from '../../components/Table'

const days = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY']

export default function RosterTable({ roster }) {
  if (!roster) return <div className="text-gray-500">No roster loaded.</div>

  const cell = (day, shift) =>
    (roster.entries || []).find(e => e.day===day && e.shift===shift)?.teamCode || ''

  return (
    <Table headers={['Day','Morning','Evening','Night']}>
      {days.map(d => (
        <tr key={d} className="border-t">
          <td className="px-3 py-2">{d}</td>
          <td className="px-3 py-2">{cell(d,'MORNING')}</td>
          <td className="px-3 py-2">{cell(d,'EVENING')}</td>
          <td className="px-3 py-2">{cell(d,'NIGHT')}</td>
        </tr>
      ))}
    </Table>
  )
}
