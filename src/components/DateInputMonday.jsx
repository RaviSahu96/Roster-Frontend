import Input from './Input'

export default function DateInputMonday({ value, onChange }) {
  const ensureMonday = (v) => {
    if (!v) return
    const d = new Date(v + 'T00:00:00')
    const dow = d.getUTCDay() // 1 = Monday
    // if (dow !== 1) { alert('Pick a Monday date.'); return }
    onChange(v)
  }
  return <Input type="date" value={value} onChange={e=>ensureMonday(e.target.value)} />
}
