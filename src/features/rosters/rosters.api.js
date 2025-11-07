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

// normalize to YYYY-MM-DD
function toIsoDate(input) {
  if (!input) return input;
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(input);
  if (m) return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
  m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(input);
  if (m) return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;
  return input;
}

export async function createRoster(body) {
  const payload = {
    weekStart: toIsoDate(body.weekStart),
    teamSize: Number(body.teamSize || 3),
    teamIds: body.teamIds || [],           // send teamIds
    includeBackup: !!body.includeBackup
  };
  const { data } = await api.post('/rosters/create', payload);
  return data;
}

export async function getRoster(weekStart) {
  const { data } = await api.get('/rosters', { params: { weekStart: toIsoDate(weekStart) } });
  return data;
}

export async function exportRoster(weekStart) {
  const res = await api.get('/rosters/export', {
    params: { weekStart: toIsoDate(weekStart) },
    responseType: 'blob'
  });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `roster-${toIsoDate(weekStart)}.xlsx`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
