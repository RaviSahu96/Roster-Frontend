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

  useEffect(() => {
    setForm(initial ?? { name: '', email: '', skill: '', active: true })
    setErrors({})
  }, [initial])

  const isEditing = !!initial?.id

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
    setForm(initial ?? { name: '', email: '', skill: '', active: true })
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? 'Edit Member' : 'Add New Member'}
        </h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Name <span className="text-red-400">*</span>
            </label>
            <Input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter member name"
            />
            {errors.name && (
              <div className="text-red-300 text-sm mt-2 flex items-center gap-1">
                ⚠ {errors.name}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Email <span className="text-red-400">*</span>
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Enter email address"
            />
            {errors.email && (
              <div className="text-red-300 text-sm mt-2 flex items-center gap-1">
                ⚠ {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Skill <span className="text-red-400">*</span>
            </label>
            <Input
              value={form.skill}
              onChange={e => setForm({ ...form, skill: e.target.value })}
              placeholder="Enter skill"
            />
            {errors.skill && (
              <div className="text-red-300 text-sm mt-2 flex items-center gap-1">
                ⚠ {errors.skill}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-red-900 rounded-lg border border-red-700">
          <input
            id="active"
            type="checkbox"
            checked={form.active ?? true}
            onChange={e => setForm({ ...form, active: e.target.checked })}
            className="w-5 h-5 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
          />
          <label htmlFor="active" className="text-sm font-medium text-white">
            Active Member
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Member' : 'Save Member'}
          </Button>

          {isEditing && (
            <Button
              type="button"
              variant="secondary"
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
    </div>
  )
}