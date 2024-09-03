import { IDeviceItemBuyParam } from '@/interfaces/i.devices'
import https from '../constants/https'

export const getUserDevice = (index?: number) => {
  return https.get(`/devices/user-device-item`, {
    params: {
      index
    }
  })
}

export const getDevicesByType = ({ type, page }: { type?: string; page?: number }) => {
  return https.get(`/devices/item`, {
    params: {
      type,
      page,
      size: 16
    }
  })
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
export const buyDeviceItem = (data: IDeviceItemBuyParam) => {
  return https.post(`/devices/buy-item`, data)
}

export const listUserItemDevice = (sortBy?: string, sortAscending?: boolean, type?: string) => {
  return https.get(`/devices/user-item`, {
    params: {
      sortBy,
      sortAscending,
      type
    }
  })
}
