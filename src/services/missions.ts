import https from '@/constants/https'

export const getDailyCheckIn = () => {
  return https.get('/missions/daily-checkin')
}

export const checkIn = () => {
  return https.post('/missions/daily-checkin')
}

export const getListMission = () => {
  return https.get('/missions')
}

export const verifyMission = (id: number) => {
  return https.get(`/missions/verify-task/${id}`)
}

export const claimTask = (id: number) => {
  return https.get(`/missions/claim-task/${id}`)
}
