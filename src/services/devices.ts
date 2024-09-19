import { IDeviceItemBuyParam, IFilterDevice, IParamUseKey } from '@/interfaces/i.devices'
import https from '../constants/https'

export const getUserDevice = ({
  index,
  type,
  page
}: {
  index?: number
  type?: string
  page?: number
}) => {
  return https.get(`/devices/user-device-item`, {
    params: {
      index,
      type,
      page: page || 1,
      size: 12
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
    headers: {},
    params: {
      type,
      page,
      ...filterOptions,
      size: 12
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
  page: number
}) => {
  return https.get(`/devices/user-item`, {
    params: {
      ...params,
      size: 12
    }
  })
}

export const changeNameDevice = (data: { index: number; name: string }) => {
  return https.post('/devices/change-name', data)
}

export const getNewDevice = () => {
  return https.get('/devices/add-device')
}

export const estimateUseKey = (data: IParamUseKey) => {
  return https.post('/devices/estimate-use-key', data)
}

export const getUseKey = (data: IParamUseKey) => {
  return https.post('/devices/use-key', data)
}

export const swapDevice = (removeId: number, addId: number) => {
  return https.get(`/devices/swap-item/${removeId}/${addId}`)
}
