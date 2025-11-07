// import { useState } from 'react'
// import Input from '../../components/Input'
// import Button from '../../components/Button'

// export default function MemberForm({ onSubmit, initial }) {
//   const [form, setForm] = useState(initial ?? { name:'', email:'', skill:'', active:true })

//   return (
//     <form className="space-y-3" onSubmit={async (e)=>{ e.preventDefault(); await onSubmit(form) }}>
//       <div className="grid md:grid-cols-3 gap-3">
//         <div>
//           <label className="text-xs text-gray-500">Name</label>
//           <Input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
//         </div>
//         <div>
//           <label className="text-xs text-gray-500">Email</label>
//           <Input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
//         </div>
//         <div>
//           <label className="text-xs text-gray-500">Skill</label>
//           <Input value={form.skill} onChange={e=>setForm({...form, skill:e.target.value})}/>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <input id="active" type="checkbox" checked={form.active ?? true}
//                onChange={e=>setForm({...form, active:e.target.checked})}/>
//         <label htmlFor="active">Active</label>
//       </div>
//       <Button type="submit">Save Member</Button>
//     </form>
//   )
// }
import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function MemberForm({ onSubmit, initial }) {
  const [form, setForm] = useState(initial ?? { name:'', email:'', skill:'', active:true })

  // ✅ when you click "Edit", refresh the form with the selected row
  useEffect(() => {
    setForm(initial ?? { name:'', email:'', skill:'', active:true })
  }, [initial])

  const isEditing = !!initial?.id

  return (
    <form className="space-y-3" onSubmit={async (e)=>{ e.preventDefault(); await onSubmit(form) }}>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-500">Name</label>
          <Input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        </div>
        <div>
          <label className="text-xs text-gray-500">Email</label>
          <Input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        </div>
        <div>
          <label className="text-xs text-gray-500">Skill</label>
          <Input value={form.skill} onChange={e=>setForm({...form, skill:e.target.value})}/>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input id="active" type="checkbox" checked={form.active ?? true}
               onChange={e=>setForm({...form, active:e.target.checked})}/>
        <label htmlFor="active">Active</label>
      </div>

      <div className="flex gap-2">
        <Button type="submit">{isEditing ? 'Update Member' : 'Save Member'}</Button>
        {isEditing && (
          <Button type="button" className="bg-gray-600 hover:bg-gray-700"
                  onClick={()=>setForm({ name:'', email:'', skill:'', active:true })}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
