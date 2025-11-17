// import api from '../../lib/api'

// export async function createRoster(body) {
//   const { data } = await api.post('/rosters/create', body)
//   return data
// }
// export async function getRoster(weekStart) {
//   const { data } = await api.get('/rosters', { params: { weekStart } })
//   return data
// }
// export async function exportRoster(weekStart) {
//   const res = await api.get('/rosters/export', { params: { weekStart }, responseType: 'blob' })
//   const url = URL.createObjectURL(res.data)
//   const a = document.createElement('a')
//   a.href = url
//   a.download = `roster-${weekStart}.xlsx`
//   document.body.appendChild(a)
//   a.click()
//   a.remove()
//   URL.revokeObjectURL(url)
// }

import api from '../../lib/api'

export async function createRoster({ year, month, teamIds }) {
  const payload = {
    year: Number(year),
    month: Number(month),
    teamIds: teamIds || []
  }
  const { data } = await api.post('/rosters/create-monthly', payload)
  return data
}

export async function getRoster(year, month) {
  const { data } = await api.get('/rosters/monthly', {
    params: { year, month }
  })
  return data
}

export async function exportRoster(year, month) {
  const res = await api.get('/rosters/export-monthly', {
    params: { year, month },
    responseType: 'blob'
  })

  const url = URL.createObjectURL(res.data)
  const a = document.createElement('a')
  a.href = url
  a.download = `roster-${year}-${month}.xlsx`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
