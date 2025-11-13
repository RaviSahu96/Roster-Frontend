import { useEffect, useState } from 'react'
import Button from '../../components/Button'
// If you don't have a Table wrapper, use a normal <table>
import TeamForm from './TeamForm'
import { getTeams, createTeam, updateTeam, deleteTeam } from './teams.api'

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [editing, setEditing] = useState(null)

  const load = async () => setTeams(await getTeams())
  useEffect(() => { load() }, [])

  const handleDelete = async (code) => {
    const ok = confirm(`Delete team ${code}?`)
    if (!ok) return
    // ✅ optimistic remove from UI
    setTeams(prev => prev.filter(t => t.code !== code))
    try {
      await deleteTeam(code)
      // safety reload (in case backend filtered/soft delete)
      await load()
      alert(`Team ${code} deleted.`)
    } catch (e) {
      // rollback on error (re-load)
      await load()
      const msg = e?.response?.data?.message || e.message || 'Delete failed'
      alert(msg)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Teams</h1>

      <TeamForm
        initial={editing ?? undefined}
        onSubmit={async (body) => {
          if (editing?.code) {
            await updateTeam(editing.code, {
              memberIds: body.memberIds,
              backupId: body.backupId
            })
            setEditing(null)
          } else {
            await createTeam(body)
          }
          await load()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Code</th>
              <th className="text-left px-3 py-2">Members</th>
              <th className="text-left px-3 py-2">Backup</th>
              <th className="text-left px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(t => (
              <tr key={t.code} className="border-t">
                <td className="px-3 py-2">{t.code}</td>
                <td className="px-3 py-2">{(t.members || []).map(m => m.name).join(', ')}</td>
                <td className="px-3 py-2">{t.backup?.name || '-'}</td>
                <td className="px-3 py-2 flex gap-2">
                  <Button
                    className="bg-amber-600 hover:bg-amber-700"
                    onClick={() => { setEditing(t); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleDelete(t.code)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-gray-500" colSpan={4}>No teams.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
