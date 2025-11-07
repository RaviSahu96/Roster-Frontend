// import { useEffect, useState } from 'react'
// import Table from '../../components/Table'
// import Button from '../../components/Button'
// import TeamForm from './TeamForm'
// import { getTeams, createTeam, updateTeam } from './teams.api'

// export default function TeamsPage() {
//   const [teams, setTeams] = useState([])
//   const [editing, setEditing] = useState(null)

//   const load = async () => setTeams(await getTeams())
//   useEffect(()=>{ load() }, [])

//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl font-semibold">Teams</h1>

//       <TeamForm
//         initial={editing ?? undefined}
//         onSubmit={async (body) => {
//           if (editing?.code) { await updateTeam(editing.code, body); setEditing(null) }
//           else { await createTeam(body) }
//           await load()
//         }}
//       />

//       <Table headers={['Code','Members','Backup','Actions']}>
//         {teams.map(t => (
//           <tr key={t.code} className="border-t">
//             <td className="px-3 py-2">{t.code}</td>
//             <td className="px-3 py-2">{(t.members||[]).map(m=>m.name).join(', ')}</td>
//             <td className="px-3 py-2">{t.backup?.name || '-'}</td>
//             <td className="px-3 py-2">
//               <Button className="bg-amber-600 hover:bg-amber-700" onClick={()=>setEditing(t)}>Edit</Button>
//             </td>
//           </tr>
//         ))}
//       </Table>
//     </div>
//   )
// }
import { useEffect, useState, useRef } from 'react'
import Table from '../../components/Table'
import Button from '../../components/Button'
import TeamForm from './TeamForm'
import { getTeams, createTeam, updateTeam } from './teams.api'

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [editing, setEditing] = useState(null)
  const formRef = useRef(null)

  const load = async () => setTeams(await getTeams())
  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Teams</h1>

      <div ref={formRef}>
        <TeamForm
          initial={editing ?? undefined}
          onSubmit={async (body) => {
            if (editing?.code) {
              //  EDIT path: use existing code in URL
              await updateTeam(editing.code, {
                code: editing.code,               // backend expects code (we keep same)
                memberIds: body.memberIds || [],
                backupId: body.backupId ?? null
              })
              setEditing(null)                    // clear edit mode
            } else {
              //  CREATE path
              await createTeam(body)
            }
            await load()
            // optional: scroll table into view
          }}
        />
      </div>

      <Table headers={['Code','Members','Backup','Actions']}>
        {teams.map(t => (
          <tr key={t.code} className="border-t">
            <td className="px-3 py-2">{t.code}</td>
            <td className="px-3 py-2">{(t.members || []).map(m => m.name).join(', ')}</td>
            <td className="px-3 py-2">{t.backup?.name || '-'}</td>
            <td className="px-3 py-2">
              <Button
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => {
                  setEditing(t)                  // ✅ this triggers useEffect in TeamForm
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  )
}
