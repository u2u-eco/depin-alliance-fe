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

export const getListMissionDally = () => {
  return https.get('/missions/daily')
}

export const getListMissionByPartner = () => {
  return https.get('/missions/partner')
}

export const verifyMission = (id: number, isDaily?: boolean, message?: string) => {
  let url = `/missions/${isDaily ? 'verify-task-daily' : 'verify-task'}/${id}`
  if (message) {
    url += `?hash=${message}`
  }
  return https.get(url)
}

export const claimTask = (id: number, isDaily?: boolean) => {
  return https.get(`/missions/${isDaily ? 'claim-task-daily' : 'claim-task'}/${id}`)
}

export const verifyMissionQuiz = (id: number, data: IQuizItem[], isDaily?: boolean) => {
  return https.post(`/missions/${isDaily ? 'verify-task-daily' : 'verify-task'}/${id}`, data)
}
