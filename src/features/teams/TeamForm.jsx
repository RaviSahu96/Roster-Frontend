
import { useEffect, useMemo, useState } from 'react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { getActiveMembers } from '../members/members.api'
import { getTeams } from './teams.api' // must expose getTeams()

export default function TeamForm({ initial, onSubmit }) {
  const [allMembers, setAllMembers] = useState([])
  const [allTeams, setAllTeams] = useState([])

  const [code, setCode] = useState(initial?.code ?? '')
  const [memberIds, setMemberIds] = useState((initial?.members || []).map(m => m.id))
  const [backupId, setBackupId] = useState(initial?.backup?.id ?? '')
  const [error, setError] = useState('')
  const isEditing = !!initial?.code
  const MAX = 3

  useEffect(() => {
    // load only active members + all teams (to detect already-used members)
    getActiveMembers().then(setAllMembers)
    getTeams().then(setAllTeams)
  }, [])

  // when clicking "Edit"
  useEffect(() => {
    setCode(initial?.code ?? '')
    setMemberIds((initial?.members || []).map(m => m.id))
    setBackupId(initial?.backup?.id ?? '')
    setError('')
  }, [initial])

  // Members already used in other teams (ignore current team while editing)
  const usedMemberIds = useMemo(() => {
    const ids = new Set()
    allTeams.forEach(t => {
      if (initial?.code && t.code === initial.code) return
      ;(t.members || []).forEach(m => ids.add(m.id))
    })
    return ids
  }, [allTeams, initial])

  const toggleMember = (id) => {
    setMemberIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX) return prev // cap at 3
      return [...prev, id]
    })
  }

  const isCheckboxDisabled = (id) => {
    const usedElsewhere = usedMemberIds.has(id) && !memberIds.includes(id)
    const maxReached = !memberIds.includes(id) && memberIds.length >= MAX
    return usedElsewhere || maxReached
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
    if (backupId && memberIds.includes(Number(backupId))) {
      setError('Backup cannot be one of the selected members.')
      return
    }

    await onSubmit({
      code: code.trim(),
      memberIds,
      backupId: backupId || null,
    })
    setCode('')
    setBackupId('')
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-500">Team Code</label>
          <Input
            placeholder="Enter Team Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isEditing}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs text-gray-500">Backup (active only)</label>
          <Select value={backupId} onChange={(e) => setBackupId(e.target.value)}>
            <option value="">-- none --</option>
            {allMembers.map((m) => (
              <option
                key={m.id}
                value={m.id}
                disabled={memberIds.includes(m.id)} // prevent selecting a main member as backup
              >
                {m.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-500 mb-1">
          Members (select {MAX}) — {memberIds.length}/{MAX} selected
        </div>
        <div className="grid md:grid-cols-4 gap-2">
          {allMembers.map((m) => {
            const disabled = isCheckboxDisabled(m.id)
            const usedElsewhere = usedMemberIds.has(m.id) && !memberIds.includes(m.id)
            return (
              <label
                key={m.id}
                className={`border rounded px-3 py-2 flex items-center gap-2 ${
                  disabled ? 'opacity-50' : ''
                }`}
                title={usedElsewhere ? 'Already assigned to another team' : ''}
              >
                <input
                  type="checkbox"
                  checked={memberIds.includes(m.id)}
                  onChange={() => toggleMember(m.id)}
                  disabled={disabled}
                />
                <span>
                  {m.name}
                  {usedElsewhere ? ' (in other team)' : ''}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {error && <div className="text-red-600 text-sm font-medium">⚠ {error}</div>}

      <div className="flex gap-2">
        <Button type="submit">{isEditing ? 'Update Team' : 'Save Team'}</Button>
        {isEditing && (
          <Button
            type="button"
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => {
              setCode('')
              setMemberIds([])
              setBackupId('')
              setError('')
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
