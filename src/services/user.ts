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

export const detectDeviceInfo = () => {
  return https.get('/users/detect-device-info')
}

export const claimRewardNewUser = () => {
  return https.get('/users/claim-reward-new-user')
}

export const claim = () => {
  return https.get('/users/claim')
}

export const mining = () => {
  return https.get('users/mining')
}

export const getRanking = () => {
  return https.get('users/ranking-engineer')
}
