import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div className="font-bold text-white text-lg">RosterPro</div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <NavLink 
              to="/" 
              className={({isActive}) => `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? 'bg-red-600 text-white shadow-lg border border-red-500' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/members" 
              className={({isActive}) => `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? 'bg-red-600 text-white shadow-lg border border-red-500' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Members
            </NavLink>
            <NavLink 
              to="/teams" 
              className={({isActive}) => `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? 'bg-red-600 text-white shadow-lg border border-red-500' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Teams
            </NavLink>
            <NavLink 
              to="/roster" 
              className={({isActive}) => `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? 'bg-red-600 text-white shadow-lg border border-red-500' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Roster
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}