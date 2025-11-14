import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import TeamForm from './TeamForm'
import { getTeams, createTeam, updateTeam, deleteTeam } from './teams.api'

export default function TeamsPage() {
  const [teams, setTeams] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const teamsData = await getTeams()
      setTeams(teamsData || [])
    } catch (error) {
      console.error('Failed to load teams:', error)
      setTeams([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    load() 
  }, [])

  const handleDelete = async (code) => {
    if (!confirm(`Are you sure you want to delete team ${code}?`)) return
    
    // Optimistic update
    const originalTeams = teams
    setTeams(prev => prev.filter(t => t.code !== code))
    
    try {
      await deleteTeam(code)
      // Reload to ensure sync with backend
      await load()
    } catch (error) {
      // Rollback on error
      setTeams(originalTeams)
      const msg = error?.response?.data?.message || error?.message || 'Delete failed'
      alert(msg)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Teams Management</h1>
        <p className="text-gray-400">Organize members into teams with backup support</p>
      </div>

      {/* Team Form */}
      <TeamForm
        initial={editing ?? undefined}
        onSubmit={async (body) => {
          try {
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
          } catch (error) {
            console.error('Failed to save team:', error)
            alert('Failed to save team. Please try again.')
          }
        }}
      />

      {/* Teams Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-white rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Teams Overview</h3>
              <span className="text-sm text-gray-400 ml-2">({teams.length} teams)</span>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={load}
            >
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-400">Loading teams...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-red-600">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-white text-xs uppercase tracking-wider">Code</th>
                  <th className="text-left px-6 py-4 font-semibold text-white text-xs uppercase tracking-wider">Members</th>
                  <th className="text-left px-6 py-4 font-semibold text-white text-xs uppercase tracking-wider">Backup</th>
                  <th className="text-left px-6 py-4 font-semibold text-white text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {teams.map(team => (
                  <tr key={team.code} className="hover:bg-gray-750 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <span className="font-bold text-white text-lg">{team.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {(team.members || []).map(member => (
                          <div key={member.id} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-white text-sm">{member.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {team.backup ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-white">{team.backup.name}</span>
                          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">Backup</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No backup assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => { 
                            setEditing(team)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleDelete(team.code)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {teams.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <div className="text-lg font-medium">No teams created yet</div>
                        <div className="text-sm max-w-md">
                          Create your first team using the form above. Teams help organize members for roster scheduling.
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}