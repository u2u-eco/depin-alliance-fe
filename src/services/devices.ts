import { IDeviceItemAddParam } from '@/interfaces/i.devices'
import https from '../constants/https'

export const getUserDevice = (index: number) => {
  return https.get(`/devices/user-device-item?index=${index}`)
}

export const getDevicesByType = (type: string) => {
  return https.get(`/devices/item?type=${type}`)
}

export const addDeviceItem = (data: IDeviceItemAddParam) => {
  return https.post('/devices/add-item', data)
}

export const getListDevice = () => {
  return https.get('/devices/user-device')
}
