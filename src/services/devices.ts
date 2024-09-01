import { IDeviceItemAddParam } from '@/interfaces/i.devices'
import https from '../constants/https'

export const getUserDevice = (index?: number) => {
  return https.get(`/devices/user-device-item`, {
    params: {
      index
    }
  })
}

export const getDevicesByType = (type: string) => {
  return https.get(`/devices/item?type=${type}`)
}

export const buyDeviceItem = (data: IDeviceItemAddParam) => {
  return https.post('/devices/buy-item', data)
}

export const getListDevice = () => {
  return https.get('/devices/user-device')
}

export const addItem = (index: number, itemId: number) => {
  return https.get(`/devices/add-item/${index}/${itemId}`)
}

export const removeItem = (itemId: number) => {
  return https.get(`/devices/remove-item/${itemId}`)
}

export const sellItem = (itemId: number) => {
  return https.get(`/devices/sell-item/${itemId}`)
}
