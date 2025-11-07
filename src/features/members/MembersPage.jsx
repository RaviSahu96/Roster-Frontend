// import { useEffect, useState } from 'react'
// import Table from '../../components/Table'
// import Button from '../../components/Button'
// import MemberForm from './MemberForm'
// import { getMembers, createMember, deleteMember, updateMember } from './members.api'

// export default function MembersPage() {
//   const [members, setMembers] = useState([])
//   const [editing, setEditing] = useState(null)

//   const load = async () => setMembers(await getMembers())
//   useEffect(()=>{ load() }, [])

//   return (
//     <div className="space-y-6">
//       <h1 className="text-xl font-semibold">Members</h1>

//       <MemberForm
//         initial={editing ?? undefined}
//         onSubmit={async (m) => {
//           if (editing?.id) { await updateMember(editing.id, m); setEditing(null) }
//           else { await createMember(m) }
//           await load()
//         }}
//       />

//       <Table headers={['ID','Name','Email','Skill','Active','Actions']}>
//         {members.map(m => (
//           <tr key={m.id} className="border-t">
//             <td className="px-3 py-2">{m.id}</td>
//             <td className="px-3 py-2">{m.name}</td>
//             <td className="px-3 py-2">{m.email}</td>
//             <td className="px-3 py-2">{m.skill}</td>
//             <td className="px-3 py-2">{String(m.active)}</td>
//             <td className="px-3 py-2 flex gap-2">
//               <Button className="bg-amber-600 hover:bg-amber-700" onClick={()=>setEditing(m)}>Edit</Button>
//               <Button className="bg-red-600 hover:bg-red-700" onClick={async()=>{ await deleteMember(m.id); await load() }}>Delete</Button>
//             </td>
//           </tr>
//         ))}
//       </Table>
//     </div>
//   )
// }
import { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Button from '../../components/Button'
import MemberForm from './MemberForm'
import { getMembers, createMember, deleteMember, updateMember } from './members.api'

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const all = await getMembers()
    // ✅ Hide soft-deleted records
    setMembers(all.filter(m => m.active !== false))
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Members</h1>

      <MemberForm
        initial={editing ?? undefined}
        onSubmit={async (m) => {
          if (editing?.id) {
            await updateMember(editing.id, m)
            setEditing(null)
          } else {
            await createMember(m)
          }
          await load()
        }}
      />

      <Table headers={['ID','Name','Email','Skill','Active','Actions']}>
        {members.map(m => (
          <tr key={m.id} className="border-t">
            <td className="px-3 py-2">{m.id}</td>
            <td className="px-3 py-2">{m.name}</td>
            <td className="px-3 py-2">{m.email}</td>
            <td className="px-3 py-2">{m.skill}</td>
            <td className="px-3 py-2">{String(m.active)}</td>
            <td className="px-3 py-2 flex gap-2">
              <Button className="bg-amber-600 hover:bg-amber-700" onClick={()=>setEditing(m)}>Edit</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={async()=>{
                await deleteMember(m.id)
                await load()
              }}>Delete</Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  )
}
