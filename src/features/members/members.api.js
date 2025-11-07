// import api from '../../lib/api'

// export async function getMembers() {
//   const { data } = await api.get('/members')
//   return data
// }
// export async function createMember(m) {
//   const { data } = await api.post('/members', m)
//   return data
// }
// export async function updateMember(id, m) {
//   const { data } = await api.put(`/members/${id}`, m)
//   return data
// }
// export async function deleteMember(id) {
//   await api.delete(`/members/${id}`)
// }

import api from '../../lib/api'

export async function getMembers() {
  const { data } = await api.get('/members')
  return data
}

// ✅ only active
export async function getActiveMembers() {
  const { data } = await api.get('/members/active')
  return data
}

export async function createMember(m) { const { data } = await api.post('/members', m); return data }
export async function updateMember(id, m) { const { data } = await api.put(`/members/${id}`, m); return data }
export async function deleteMember(id) { await api.delete(`/members/${id}`) }
