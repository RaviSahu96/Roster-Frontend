import api from '../../lib/api'

export async function getTeams() {
  const { data } = await api.get('/teams')
  return data
}
export async function createTeam(body) {
  const { data } = await api.post('/teams', body)
  return data
}
export async function updateTeam(code, body) {
  const { data } = await api.put(`/teams/${code}`, body)
  return data
}
