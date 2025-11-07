import { Link } from 'react-router-dom'

const Card = ({ to, title, text }) => (
  <Link to={to} className="block border rounded p-5 bg-white hover:shadow">
    <div className="font-semibold">{title}</div>
    <div className="text-sm text-gray-600">{text}</div>
  </Link>
)

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card to="/members" title="Members" text="Create, edit and manage employees" />
        <Card to="/teams" title="Teams" text="Group members and set backups" />
        <Card to="/roster" title="Roster" text="Generate Mon–Fri schedule and export to Excel" />
      </div>
    </div>
  )
}
