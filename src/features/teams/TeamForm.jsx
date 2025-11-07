
// import { useEffect, useState } from 'react'
// import Input from '../../components/Input'
// import Select from '../../components/Select'
// import Button from '../../components/Button'
// import { getMembers } from '../members/members.api'

// export default function TeamForm({ initial, onSubmit }) {
//   const [allMembers, setAllMembers] = useState([])
//   const [code, setCode] = useState(initial?.code ?? '')
//   const [memberIds, setMemberIds] = useState((initial?.members || []).map(m => m.id))
//   const [backupId, setBackupId] = useState(initial?.backup?.id ?? '')
//   const [showButton, setShowButton] = useState(false);
//   const isEditing = !!initial?.code

//   useEffect(() => { getMembers().then(setAllMembers) }, [])

//   // IMPORTANT: when clicking Edit, refresh the form state from the selected row
//   useEffect(() => {
//     setCode(initial?.code ?? '')
//     setMemberIds((initial?.members || []).map(m => m.id))
//     setBackupId(initial?.backup?.id ?? '')
//   }, [initial])

//   const toggleMember = (id) => {
//     setMemberIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
//   }

//   return (
//     <form className="space-y-3" onSubmit={async (e) => {
//       e.preventDefault()
//       await onSubmit({ code, memberIds, backupId: backupId || null })
//     }}>
//       <div className="grid md:grid-cols-3 gap-3">
//         <div>
//           <label className="text-xs text-gray-500">Team Code</label>
//           <Input
//             placeholder="T1"
//             value={code}
//             onChange={e => setCode(e.target.value)}
//             disabled={isEditing}     //  do not allow changing code during edit
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="text-xs text-gray-500">Backup</label>
//           <Select value={backupId} onChange={e => setBackupId(e.target.value)}>
//             <option value="">-- none --</option>
//             {allMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
//           </Select>
//         </div>
//       </div>

//       <div>
//         <div className="text-xs text-gray-500 mb-1">Members (select 3)</div>
//         <div className="grid md:grid-cols-4 gap-2">
//           {allMembers.map(m => (
//             <label key={m.id} className="border rounded px-3 py-2 flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={memberIds.includes(m.id)}
//                 onChange={() => toggleMember(m.id)}
//               />
//               <span>{m.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-2">
//         <Button type="submit">{isEditing ? 'Update Team' : 'Save Team'}</Button>
//         {isEditing && (
//           <Button
//             type="button"
//             // if()disabled
//             className="bg-gray-600 hover:bg-gray-700"
//             onClick={() => {
//               // reset form when cancel editing
//               setCode('')
//               setMemberIds([])
//               setBackupId('')
//               // caller will clear editing state
//             }}
//           >
//             Cancel
//           </Button>
//         )}
//       </div>
//     </form>
//   )
// }
// import { useEffect, useState } from 'react'
// import Input from '../../components/Input'
// import Select from '../../components/Select'
// import Button from '../../components/Button'
// import { getMembers } from '../members/members.api'

// export default function TeamForm({ initial, onSubmit }) {
//   const [allMembers, setAllMembers] = useState([])
//   const [code, setCode] = useState(initial?.code ?? '')
//   const [memberIds, setMemberIds] = useState((initial?.members || []).map(m => m.id))
//   const [backupId, setBackupId] = useState(initial?.backup?.id ?? '')
//   const [error, setError] = useState('')
//   const isEditing = !!initial?.code

//   useEffect(() => { getMembers().then(setAllMembers) }, [])

//   // Refresh form when editing an existing team
//   useEffect(() => {
//     setCode(initial?.code ?? '')
//     setMemberIds((initial?.members || []).map(m => m.id))
//     setBackupId(initial?.backup?.id ?? '')
//   }, [initial])

//   const toggleMember = (id) => {
//     setMemberIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // 🚨 Validation: Ensure team name is not empty
//     if (!code.trim()) {
//       setError('Team name (code) is required.')
//       return
//     }

//     // Optional: restrict exactly 3 members
//     if (memberIds.length !== 3) {
//       setError('A team must have exactly 3 members.')
//       return
//     }

//     setError('')
//     await onSubmit({ code, memberIds, backupId: backupId || null })
//   }

//   return (
//     <form className="space-y-3" onSubmit={handleSubmit}>
//       <div className="grid md:grid-cols-3 gap-3">
//         <div>
//           <label className="text-xs text-gray-500">Team Code *</label>
//           <Input
//             placeholder="T1"
//             value={code}
//             onChange={e => setCode(e.target.value)}
//             disabled={isEditing}
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="text-xs text-gray-500">Backup</label>
//           <Select value={backupId} onChange={e => setBackupId(e.target.value)}>
//             <option value="">-- none --</option>
//             {allMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
//           </Select>
//         </div>
//       </div>

//       <div>
//         <div className="text-xs text-gray-500 mb-1">Members (select 3)</div>
//         <div className="grid md:grid-cols-4 gap-2">
//           {allMembers.map(m => (
//             <label key={m.id} className="border rounded px-3 py-2 flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={memberIds.includes(m.id)}
//                 onChange={() => toggleMember(m.id)}
//               />
//               <span>{m.name}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Display error if any */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       <div className="flex gap-2">
//         <Button type="submit">{isEditing ? 'Update Team' : 'Save Team'}</Button>
//         {isEditing && (
//           <Button
//             type="button"
//             className="bg-gray-600 hover:bg-gray-700"
//             onClick={() => {
//               setCode('')
//               setMemberIds([])
//               setBackupId('')
//             }}
//           >
//             Cancel
//           </Button>
//         )}
//       </div>
//     </form>
//   )
// }

import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { getActiveMembers } from '../members/members.api'

export default function TeamForm({ initial, onSubmit }) {
  const [allMembers, setAllMembers] = useState([])
  const [code, setCode] = useState(initial?.code ?? '')
  const [memberIds, setMemberIds] = useState((initial?.members || []).map(m => m.id))
  const [backupId, setBackupId] = useState(initial?.backup?.id ?? '')
  const isEditing = !!initial?.code
  const MAX = 3

  useEffect(() => { getActiveMembers().then(setAllMembers) }, [])

  // refresh when clicking Edit
  useEffect(() => {
    setCode(initial?.code ?? '')
    setMemberIds((initial?.members || []).map(m => m.id))
    setBackupId(initial?.backup?.id ?? '')
  }, [initial])

  const toggleMember = (id) => {
    // ✅ uniqueness is natural with includes() + set logic
    setMemberIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX) return prev     // ✅ do not exceed 3
      return [...prev, id]
    })
  }

  const isDisabled = (id) => {
    // once 3 selected, disable all unchecked
    return !memberIds.includes(id) && memberIds.length >= MAX
  }

  return (
    <form className="space-y-3" onSubmit={async (e) => {
      e.preventDefault()
      if (memberIds.length !== MAX) {
        alert(`Please select exactly ${MAX} unique members`)
        return
      }
      await onSubmit({ code, memberIds, backupId: backupId || null })
    }}>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-500">Team Code</label>
          <Input placeholder="T1" value={code} onChange={e=>setCode(e.target.value)} disabled={isEditing}/>
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-gray-500">Backup (active only)</label>
          <Select value={backupId} onChange={e=>setBackupId(e.target.value)}>
            <option value="">-- none --</option>
            {allMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </Select>
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-500 mb-1">
          Members (select {MAX}) — {memberIds.length}/{MAX} selected
        </div>
        <div className="grid md:grid-cols-4 gap-2">
          {allMembers.map(m => (
            <label key={m.id} className={`border rounded px-3 py-2 flex items-center gap-2 ${isDisabled(m.id) ? 'opacity-50' : ''}`}>
              <input
                type="checkbox"
                checked={memberIds.includes(m.id)}
                onChange={()=>toggleMember(m.id)}
                disabled={isDisabled(m.id)}
              />
              <span>{m.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit">{isEditing ? 'Update Team' : 'Save Team'}</Button>
        {isEditing && (
          <Button type="button" className="bg-gray-600 hover:bg-gray-700"
                  onClick={() => { setCode(''); setMemberIds([]); setBackupId('') }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
