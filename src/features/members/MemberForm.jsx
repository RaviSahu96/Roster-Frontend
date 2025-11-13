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
  const [form, setForm] = useState(initial ?? { name: '', email: '', skill: '', active: true })
  const [errors, setErrors] = useState({})

  // Refresh form when editing
  useEffect(() => {
    setForm(initial ?? { name: '', email: '', skill: '', active: true })
    setErrors({})
  }, [initial])

  const isEditing = !!initial?.id

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.email.trim()) newErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = 'Invalid email format.'
    if (!form.skill.trim()) newErrors.skill = 'Skill is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit(form)
    setErrors({})
    setForm(initial ?? { name: '', email: '', skill: '', active: true });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-3 gap-3">
        {/* Name Field */}
        <div>
          <label className="text-xs text-gray-500">Name <span className="text-red-500">*</span></label>
          <Input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Enter member name"
          />
          {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div>
          <label className="text-xs text-gray-500">Email <span className="text-red-500">*</span></label>
          <Input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Enter email address"
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>

        {/* Skill Field */}
        <div>
          <label className="text-xs text-gray-500">Skill <span className="text-red-500">*</span></label>
          <Input
            value={form.skill}
            onChange={e => setForm({ ...form, skill: e.target.value })}
            placeholder="Enter skill"
          />
          {errors.skill && <div className="text-red-600 text-sm mt-1">{errors.skill}</div>}
        </div>
      </div>

      {/* Active Checkbox */}
      <div className="flex items-center gap-3">
        <input
          id="active"
          type="checkbox"
          checked={form.active ?? true}
          onChange={e => setForm({ ...form, active: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="active" className="text-sm">Active</label>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button type="submit">
          {isEditing ? 'Update Member' : 'Save Member'}
        </Button>

        {isEditing && (
          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => {
              setForm({ name: '', email: '', skill: '', active: true })
              setErrors({})
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
