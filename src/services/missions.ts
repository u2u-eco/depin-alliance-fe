import https from '@/constants/https'

export const getDailyCheckIn = () => {
  return https.get('/missions/daily-checkin')
}

export const checkIn = () => {
  return https.post('/missions/daily-checkin')
}
