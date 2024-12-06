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
  return https.post('/users/detect-device-info', {})
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

export const getCurrentRanking = () => {
  return https.get('/users/current-ranking-engineer')
}

export const getRanking = () => {
  return https.get('/users/ranking-engineer')
}

export const getRankingAirdrop = () => {
  return https.get('/users/ranking-airdrop')
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

export const getListRankingEarned = () => {
  return https.get('users/ranking-earned')
}

export const getUserSetting = () => {
  return https.get('/users/settings')
}

export const updateSetting = (data: { setting: string; enable: boolean }) => {
  return https.post('/users/settings', data)
}

export const setUserConnectWallet = (data: {
  address: string
  type: string
  connectFrom: string
}) => {
  return https.post('/users/connect-wallet', data)
}
