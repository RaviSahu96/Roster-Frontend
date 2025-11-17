import { useEffect, useMemo, useState } from 'react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { getActiveMembers } from '../members/members.api'
import { getTeams } from './teams.api'

export default function TeamForm({ initial, onSubmit }) {
  const [allMembers, setAllMembers] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const [loading, setLoading] = useState(false)

  const [code, setCode] = useState(initial?.code ?? '')
  const [memberIds, setMemberIds] = useState((initial?.members || []).map(m => m.id))
  const [backupId, setBackupId] = useState(initial?.backup?.id ?? '')
  const [error, setError] = useState('')
  const isEditing = !!initial?.code
  const MAX = 4

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [members, teams] = await Promise.all([
          getActiveMembers(),
          getTeams()
        ])
        setAllMembers(members || [])
        setAllTeams(teams || [])
      } catch (error) {
        console.error('Failed to load data:', error)
        setAllMembers([])
        setAllTeams([])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    setCode(initial?.code ?? '')
    setMemberIds((initial?.members || []).map(m => m.id))
    setBackupId(initial?.backup?.id ?? '')
    setError('')
  }, [initial])

  // Get members already used as MAIN members in other teams (excluding current team when editing)
  const usedMainMemberIds = useMemo(() => {
    const ids = new Set()
    allTeams.forEach(team => {
      if (initial?.code && team.code === initial.code) return
      ;(team.members || []).forEach(member => ids.add(member.id))
    })
    return ids
  }, [allTeams, initial])

  // Get members already used as BACKUP in other teams (excluding current team when editing)
  const usedBackupMemberIds = useMemo(() => {
    const ids = new Set()
    allTeams.forEach(team => {
      if (initial?.code && team.code === initial.code) return
      if (team.backup?.id) {
        ids.add(team.backup.id)
      }
    })
    return ids
  }, [allTeams, initial])

  // Filter available main members - exclude those already assigned as MAIN members to other teams
  const availableMainMembers = useMemo(() => {
    return allMembers.filter(member => 
      !usedMainMemberIds.has(member.id) || memberIds.includes(member.id)
    )
  }, [allMembers, usedMainMemberIds, memberIds])

  // Filter available backup members - exclude:
  // 1. Members already selected as main members in THIS team
  // 2. Members already used as backup in OTHER teams
  const availableBackupMembers = useMemo(() => {
    return allMembers.filter(member => {
      // Cannot be backup if they are a main member in this team
      if (memberIds.includes(member.id)) return false
      
      // Can be backup even if they are main member in other teams
      // But cannot be backup if they are already backup in other teams
      if (usedBackupMemberIds.has(member.id) && member.id !== initial?.backup?.id) return false
      
      return true
    })
  }, [allMembers, memberIds, usedBackupMemberIds, initial])

  // Get team information for display purposes
  const getMemberTeamInfo = useMemo(() => {
    const teamMap = new Map()
    allTeams.forEach(team => {
      team.members?.forEach(member => {
        teamMap.set(member.id, { teamCode: team.code, role: 'Main' })
      })
      if (team.backup) {
        teamMap.set(team.backup.id, { teamCode: team.code, role: 'Backup' })
      }
    })
    return teamMap
  }, [allTeams])

  const toggleMember = (id) => {
    setMemberIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX) return prev
      return [...prev, id]
    })
  }

  const isCheckboxDisabled = (id) => {
    const maxReached = !memberIds.includes(id) && memberIds.length >= MAX
    return maxReached
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!code.trim()) {
      setError('Team code is required.')
      return
    }
    if (memberIds.length !== MAX) {
      setError(`Please select exactly ${MAX} unique members.`)
      return
    }
    if (!backupId) {
      setError('Backup member is required.')
      return
    }
    if (memberIds.includes(Number(backupId))) {
      setError('Backup cannot be one of the selected members.')
      return
    }

    try {
      await onSubmit({
        code: code.trim(),
        memberIds,
        backupId: backupId || null,
      })
      setError('')
    } catch (error) {
      setError('Failed to save team. Please try again.')
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-red-600 rounded-full"></div>
        <h3 className="text-lg font-semibold text-white">
          {isEditing ? `Edit Team: ${code}` : 'Create New Team'}
        </h3>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Team Code <span className="text-red-400">*</span>
            </label>
            <Input
              placeholder="Enter Team Code (e.g., ALPHA)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              disabled={isEditing}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Backup Member <span className="text-red-400">*</span>
            </label>
            <Select 
              value={backupId} 
              onChange={(e) => setBackupId(e.target.value)}
              required
            >
              <option value="" className="text-gray-400">-- Select backup member --</option>
              {availableBackupMembers.map((member) => {
                const teamInfo = getMemberTeamInfo.get(member.id)
                return (
                  <option
                    key={member.id}
                    value={member.id}
                    className="text-white"
                  >
                    {member.name} ({member.skill})
                    {teamInfo && ` - ${teamInfo.role} in ${teamInfo.teamCode}`}
                  </option>
                )
              })}
            </Select>
            {availableBackupMembers.length === 0 && !loading && (
              <div className="text-amber-400 text-xs mt-2">
                No available members for backup role. All members are either in this team or already backups for other teams.
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Team Members <span className="text-red-400">*</span>
              <span className="text-gray-400 text-xs font-normal ml-2">(Select exactly {MAX})</span>
            </label>
            <span className="text-sm text-gray-400">
              {memberIds.length}/{MAX} selected
            </span>
          </div>
          
          {loading ? (
            <div className="text-gray-400 text-sm p-4 text-center">Loading members...</div>
          ) : (
            <div>
              {availableMainMembers.length === 0 ? (
                <div className="text-center p-6 border border-gray-700 rounded-lg bg-gray-750">
                  <div className="text-gray-400 mb-2">No available members</div>
                  <div className="text-sm text-gray-500">
                    All members are already assigned to other teams as main members. 
                    {!isEditing && ' Create more members or remove some from existing teams.'}
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                  {availableMainMembers.map((member) => {
                    const disabled = isCheckboxDisabled(member.id)
                    const isCurrentlySelected = memberIds.includes(member.id)
                    const teamInfo = getMemberTeamInfo.get(member.id)
                    const isFromOtherTeam = teamInfo && !isCurrentlySelected
                    
                    return (
                      <label
                        key={member.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-200 cursor-pointer ${
                          isCurrentlySelected
                            ? 'bg-red-900 border-red-700 text-white'
                            : disabled
                            ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
                            : isFromOtherTeam
                            ? 'bg-blue-900 border-blue-700 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isCurrentlySelected}
                          onChange={() => toggleMember(member.id)}
                          disabled={disabled}
                          className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2 mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-gray-400 mt-1">{member.email}</div>
                          <div className="text-xs text-gray-500 mt-1">Skill: {member.skill}</div>
                          
                          {isCurrentlySelected && (
                            <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                              <span>✓</span>
                              Selected for this team
                            </div>
                          )}
                          
                          {isFromOtherTeam && (
                            <div className="text-xs text-blue-300 mt-2 flex items-center gap-1">
                              <span>👥</span>
                              Main member in {teamInfo.teamCode}
                            </div>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Summary Information */}
        <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
          <div className="text-sm text-gray-300 mb-3">Team Summary:</div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400">Available Main Members:</span>
              <span className="text-white ml-2">{availableMainMembers.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Available Backups:</span>
              <span className="text-white ml-2">{availableBackupMembers.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Selected Members:</span>
              <span className="text-white ml-2">{memberIds.length}/{MAX}</span>
            </div>
            <div>
              <span className="text-gray-400">Backup Selected:</span>
              <span className={`ml-2 ${backupId ? 'text-green-400' : 'text-amber-400'}`}>
                {backupId ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-gray-600">
            <div className="text-xs text-gray-400 mb-2">Color Legend:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-900 border border-red-700 rounded"></div>
                <span className="text-gray-300">Selected for this team</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-900 border border-blue-700 rounded"></div>
                <span className="text-gray-300">From other team (can be backup)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-700 border border-gray-600 rounded"></div>
                <span className="text-gray-300">Available member</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-900 border border-red-700 rounded-lg">
            <div className="text-red-200 text-sm font-medium flex items-center gap-2">
              <span>⚠</span>
              {error}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-700">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Team' : 'Create Team'}
          </Button>
          {isEditing && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                // This should be handled by parent component
              }}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}