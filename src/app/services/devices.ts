import https from '../constants/https'

export const getUserDevice = () => {
  return https.get('/devices/user-device-item')
}

export const getDevicesByType = (type: string) => {
  return https.get(`/devices/item?type=${type}`)
}
