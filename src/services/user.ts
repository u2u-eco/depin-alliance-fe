import https from '../constants/https'
import { IUserAuthReq } from '../interfaces/i.user'

export const userAuth = (data: IUserAuthReq) => {
  return https.post('/users/auth', {
    ...data
  })
}

export const getUserInfo = () => {
  return https.get('/users/info')
}

export const getUserConfig = () => {
  return https.get('/users/config')
}

export const detectDeviceInfo = () => {
  return https.get('/users/detect-device-info')
}

export const claimRewardNewUser = () => {
  return https.get('/users/claim-reward-new-user')
}

export const startContributing = () => {
  return https.get('/users/start-contributing')
}

export const claim = () => {
  return https.get('/users/claim')
}

export const mining = () => {
  return https.get('/users/mining')
}

export const getRanking = () => {
  return https.get('/users/ranking-engineer')
}

export const getListAvatar = () => {
  return https.get('/users/avatar')
}

export const updateAvatar = (avatar: string) => {
  return https.post('/users/avatar', {
    avatar
  })
}

export const getUserFriend = (params?: { page: number; size: number }) => {
  return https.get('/users/friend', {
    params
  })
}

export const getSkills = () => {
  return https.get('/users/skills')
}

export const getSkillInfo = (id: number) => {
  return https.get(`/users/skills/${id}/next-level`)
}

export const updateSkill = (id: number) => {
  return https.post(`/users/upgrade-skill`, {
    skillId: id
  })
}

export const getNextLevel = () => {
  return https.get('users/next-level')
}
