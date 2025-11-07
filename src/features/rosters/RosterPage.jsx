// import { useState } from 'react'
// import Button from '../../components/Button'
// import RosterForm from './RosterForm'
// import RosterTable from './RosterTable'
// import { createRoster, getRoster, exportRoster } from './rosters.api'

// export default function RosterPage() {
//   const [roster, setRoster] = useState(null)

//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl font-semibold">Roster</h1>

//       <RosterForm onCreate={async (weekStart, size) => {
//         try {
//           const data = await createRoster({ weekStart, teamSize: size })
//           setRoster(data)
//           alert('Roster generated')
//         } catch (e) {
//           alert(e?.response?.data?.message || 'Failed to create roster')
//         }
//       }}/>

//       <div className="flex gap-3">
//         <Button onClick={async ()=>{
//           if (!roster?.weekStart) return alert('Generate or load a roster first')
//           const data = await getRoster(roster.weekStart)
//           setRoster(data)
//         }}>Refresh</Button>

//         <Button className="bg-green-600 hover:bg-green-700" onClick={async ()=>{
//           if (!roster?.weekStart) return alert('Generate or load a roster first')
//           await exportRoster(roster.weekStart)
//         }}>Export Excel</Button>
//       </div>

//       <RosterTable roster={roster}/>
//     </div>
//   )
// }

import { useState } from 'react'
import Button from '../../components/Button'
import RosterForm from './RosterForm'
import RosterTable from './RosterTable'
import { createRoster, getRoster, exportRoster } from './rosters.api'

export default function RosterPage() {
  const [roster, setRoster] = useState(null)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Roster</h1>

      <RosterForm onCreate={async (weekStart, size, teamIds) => {
        try {
          if (!teamIds?.length) { alert('Please select at least one team.'); return }
          const data = await createRoster({ weekStart, teamSize: size, teamIds })
          setRoster(data)
          alert('Roster generated')
        } catch (e) {
          const msg = e?.response?.data?.message || e?.response?.data?.error || e.message || 'Failed to create roster'
          alert(msg)
        }
      }}/>

      <div className="flex gap-3">
        <Button onClick={async ()=>{
          if (!roster?.weekStart) return alert('Generate or load a roster first')
          const data = await getRoster(roster.weekStart)
          setRoster(data)
        }}>Refresh</Button>

        <Button className="bg-green-600 hover:bg-green-700" onClick={async ()=>{
          if (!roster?.weekStart) return alert('Generate or load a roster first')
          await exportRoster(roster.weekStart)
        }}>Export Excel</Button>
      </div>

      <RosterTable roster={roster}/>
    </div>
  )
}
