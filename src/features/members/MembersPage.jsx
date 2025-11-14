import { useEffect, useState } from 'react'
import Table from '../../components/Table'
import Button from '../../components/Button'
import MemberForm from './MemberForm'
import { getMembers, createMember, deleteMember, updateMember } from './members.api'

export default function MembersPage() {
  const [members, setMembers] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const all = await getMembers()
      setMembers(all.filter(m => m.active !== false))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return
    await deleteMember(id)
    await load()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <p className="text-gray-400">Manage and organize your team members</p>
      </div>

      {/* Member Form */}
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

      {/* Members Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-900">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-red-600 rounded-full"></div>
            <h3 className="text-lg font-semibold text-white">Team Members</h3>
            <span className="text-sm text-gray-400 ml-2">({members.length} active)</span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-400">Loading members...</div>
          </div>
        ) : (
          <Table headers={['ID', 'Name', 'Email', 'Skill', 'Status', 'Actions']}>
            {members.map(m => (
              <tr key={m.id} className="hover:bg-gray-750 transition-colors duration-150">
                <td className="px-4 py-3.5 text-gray-300 font-mono text-sm">{m.id}</td>
                <td className="px-4 py-3.5 text-white font-medium">{m.name}</td>
                <td className="px-4 py-3.5 text-gray-300">{m.email}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                    {m.skill}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    m.active 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {m.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditing(m)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="primary"
                      size="sm"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">👥</span>
                    <div>No team members found</div>
                    <div className="text-sm">Add your first team member using the form above</div>
                  </div>
                </td>
              </tr>
            )}
          </Table>
        )}
      </div>
    </div>
  )
}