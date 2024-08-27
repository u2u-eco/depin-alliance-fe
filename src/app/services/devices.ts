import https from '../constants/https'

export const getUserDevice = () => {
  return https.get('/devices/user-device-item')
}
