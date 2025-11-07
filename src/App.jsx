import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import MembersPage from './features/members/MembersPage'
import TeamsPage from './features/teams/TeamsPage'
import RosterPage from './features/rosters/RosterPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
