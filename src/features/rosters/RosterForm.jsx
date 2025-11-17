// import { useState } from 'react'
// import Button from '../../components/Button'
// import DateInputMonday from '../../components/DateInputMonday'
// import Input from '../../components/Input'

// export default function RosterForm({ onCreate }) {
//   const [week, setWeek] = useState('')
//   const [size, setSize] = useState(3)

//   return (
//     <form className="flex flex-wrap items-end gap-3" onSubmit={async (e)=>{ e.preventDefault(); await onCreate(week, size) }}>
//       <div>
//         <label className="text-xs text-gray-500">Week Start (Monday)</label>
//         <DateInputMonday value={week} onChange={setWeek}/>
//       </div>
//       <div>
//         <label className="text-xs text-gray-500">Team Size</label>
//         <Input type="number" min={1} max={10} value={size} onChange={e=>setSize(Number(e.target.value))} style={{width:140}}/>
//       </div>
//       <Button type="submit">Generate Roster</Button>
//     </form>
//   )
// }

import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { getTeams } from '../teams/teams.api'

export default function RosterForm({ onCreate }) {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [teams, setTeams] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => { getTeams().then(setTeams) }, [])

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <form className="space-y-4" onSubmit={(e)=>{
      e.preventDefault()
      onCreate(year, month, selected)
    }}>
      <div className="flex flex-col gap-4">

        <div>
          <label className="text-xs text-gray-500">Year</label>
          <Input type="number" value={year} onChange={e=>setYear(e.target.value)} />
        </div>

        <div>
          <label className="text-xs text-gray-500">Month (1–12)</label>
          <Input type="number" min={1} max={12} value={month} onChange={e=>setMonth(e.target.value)} />
        </div>

        <div>
          <label className="text-xs text-gray-500">Select Teams</label>
          <div className="grid md:grid-cols-4 gap-2">
            {teams.map(t => (
              <label key={t.id} className="border rounded px-3 py-2 flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={()=>toggle(t.id)}
                />
                <span>{t.code}</span>
              </label>
            ))}
          </div>
        </div>

        <Button type="submit">Generate Monthly Roster</Button>
      </div>
    </form>
  )
}
