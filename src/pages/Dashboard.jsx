import { Link } from 'react-router-dom'

const StatCard = ({ title, value, description, to, trend }) => (
  <Link to={to} className="block group">
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-white">{value}</div>
        {trend && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend > 0 ? 'bg-red-900 text-red-200' : 'bg-gray-700 text-gray-300'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="font-semibold text-white group-hover:text-red-400 transition-colors duration-200">{title}</div>
        <div className="text-xs text-gray-400">{description}</div>
      </div>
      <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-red-600 rounded-full transition-all duration-300 group-hover:bg-red-500" style={{ width: '75%' }}></div>
      </div>
    </div>
  </Link>
)

const QuickAction = ({ title, description, to, icon }) => (
  <Link to={to} className="block group">
    <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-red-500 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-900 rounded-lg flex items-center justify-center group-hover:bg-red-800 transition-colors duration-200">
          <span className="text-red-400 text-lg">{icon}</span>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white group-hover:text-red-400 transition-colors duration-200">{title}</div>
          <div className="text-xs text-gray-400 mt-1">{description}</div>
        </div>
        <div className="text-gray-500 group-hover:text-red-400 transition-colors duration-200">→</div>
      </div>
    </div>
  </Link>
)

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400">Manage your team roster and scheduling operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard 
          to="/members" 
          title="Team Members" 
          value="24"
          description="Active team members"
          trend={5}
        />
        <StatCard 
          to="/teams" 
          title="Active Teams" 
          value="8"
          description="Currently operational"
          trend={2}
        />
        <StatCard 
          to="/roster" 
          title="This Week" 
          value="156"
          description="Scheduled hours"
          trend={-1}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-red-600 rounded-full"></div>
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <QuickAction 
            to="/roster" 
            title="Generate Roster" 
            description="Create new weekly schedule"
            icon="📅"
          />
          <QuickAction 
            to="/members" 
            title="Add Team Member" 
            description="Register new team member"
            icon="👤"
          />
          <QuickAction 
            to="/teams" 
            title="Manage Teams" 
            description="Organize team structure"
            icon="⚡"
          />
          <QuickAction 
            to="/roster" 
            title="Export Reports" 
            description="Download schedule data"
            icon="📊"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-6 bg-white rounded-full"></div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {[
            { action: 'Roster generated for next week', time: '2 hours ago', user: 'You' },
            { action: 'Team "Alpha" updated', time: '5 hours ago', user: 'Sarah Chen' },
            { action: 'New member registered', time: '1 day ago', user: 'Mike Rodriguez' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-700 last:border-0">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm text-white">{item.action}</div>
                <div className="text-xs text-gray-400">{item.time} • by {item.user}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}