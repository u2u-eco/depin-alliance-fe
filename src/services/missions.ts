import https from '@/constants/https'
import { IMissionQuiz, IQuizItem } from '@/interfaces/i.missions'

export const getDailyCheckIn = () => {
  return https.get('/missions/daily-checkin')
}

export const checkIn = () => {
  return https.post('/missions/daily-checkin')
}

export const getListMission = () => {
  return https.get('/missions')
}

export const getListMissionByPartner = () => {
  return https.get('/missions/partner')
}

export const verifyMission = (id: number) => {
  return https.get(`/missions/verify-task/${id}`)
}

export const claimTask = (id: number) => {
  return https.get(`/missions/claim-task/${id}`)
}

export const verifyMissionQuiz = (id: number, data: IQuizItem[]) => {
  return https.post(`/missions/verify-task/${id}`, data)
}
