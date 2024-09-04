import { IDeviceItemBuyParam, IFilterDevice } from '@/interfaces/i.devices'
import https from '../constants/https'

export const getUserDevice = ({ index, type }: { index?: number; type?: string }) => {
  return https.get(`/devices/user-device-item`, {
    params: {
      index,
      type
    }
  })
}

export const getDevicesByType = ({
  type,
  page,
  filterOptions
}: {
  type?: string
  page?: number
  filterOptions: IFilterDevice
}) => {
  return https.get(`/devices/item`, {
    params: {
      type,
      page,
      ...filterOptions,
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

export const sellItem = (data: IDeviceItemBuyParam) => {
  return https.post(`/devices/sell-item`, data)
}
export const buyDeviceItem = (data: IDeviceItemBuyParam) => {
  return https.post(`/devices/buy-item`, data)
}

export const listUserItemDevice = (params: {
  sortBy?: string
  sortAscending?: boolean
  type?: string
}) => {
  return https.get(`/devices/user-item`, {
    params
  })
}

export const changeNameDevice = (data: { index: number; name: string }) => {
  return https.post('/devices/change-name', data)
}
