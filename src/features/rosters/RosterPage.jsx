import { useState } from 'react'
import Button from '../../components/Button'
import RosterForm from './RosterForm'
import RosterTable from './RosterTable'
import RosterPreview from './RosterPreview'
import { createRoster, getRoster, exportRoster } from './rosters.api'

export default function RosterPage() {
  const [roster, setRoster] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Monthly Roster Management</h1>
        <p className="text-gray-400">Generate and manage monthly team schedules</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-red-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-white">Generate Monthly Roster</h3>
            </div>
            <RosterForm 
              onCreate={async (year, month, teamIds) => {
                setLoading(true)
                try {
                  if (!teamIds?.length || teamIds.length < 3) {
                    alert('Please select at least 3 teams.')
                    return
                  }
                  const data = await createRoster({ year, month, teamIds })
                  setRoster(data)
                } catch (e) {
                  const msg = e?.response?.data?.message || e?.response?.data?.error || e.message || 'Failed to create roster'
                  alert(msg)
                } finally {
                  setLoading(false)
                }
              }}
              loading={loading}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Actions */}
          {roster && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-white rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Roster Actions</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {roster.monthName} {roster.year} • {roster.entries?.length || 0} assignments
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={async () => {
                      if (!roster?.year || !roster?.month) return alert('Generate or load a roster first')
                      const data = await getRoster(roster.year, roster.month)
                      setRoster(data)
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Refresh
                  </Button>
                  <Button 
                    onClick={async () => {
                      if (!roster?.year || !roster?.month) return alert('Generate or load a roster first')
                      await exportRoster(roster.year, roster.month)
                    }}
                    variant="primary"
                    size="sm"
                  >
                    Export Excel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Preview */}
          <RosterPreview roster={roster} />

          {/* Detailed Table */}
          {roster && (
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 bg-gray-900">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-white">Detailed Monthly Schedule</h3>
                </div>
              </div>
              <RosterTable roster={roster} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}