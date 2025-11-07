import { NavLink } from 'react-router-dom'

const link = 'px-3 py-2 rounded hover:bg-gray-200'
const active = 'bg-gray-800 text-white hover:bg-gray-700'

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <nav className="max-w-6xl mx-auto p-3 flex items-center gap-2">
        <div className="font-semibold mr-4">Roster Admin</div>
        <NavLink to="/" className={({isActive}) => `${link} ${isActive?active:''}`}>Dashboard</NavLink>
        <NavLink to="/members" className={({isActive}) => `${link} ${isActive?active:''}`}>Members</NavLink>
        <NavLink to="/teams" className={({isActive}) => `${link} ${isActive?active:''}`}>Teams</NavLink>
        <NavLink to="/roster" className={({isActive}) => `${link} ${isActive?active:''}`}>Roster</NavLink>
      </nav>
    </header>
  )
}
