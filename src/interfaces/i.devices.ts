export interface IDeviceTypeItem {
  name: string
  code: string
  type: string
  miningPower: number
  price: number
  image: string | null
  id: number
  totalItem: number
  isCanSell: boolean
}

export interface IDeviceItemBuyParam {
  code: string
  number: number
}

export interface IUserDeviceItem {
  index: number
  name: string
  totalMiningPower: number
  slotCpuMax: number
  slotCpuUsed: number
  slotGpuMax: number
  slotGpuUsed: number
  slotRamMax: number
  slotRamUsed: number
  slotStorageMax: number
  slotStorageUsed: number
}

export interface IDeviceDetailInfo {
  equip: number
  amount?: number
  totalProfit: number
}

export interface IFilterDevice {
  page?: number
  sortBy: string
  sortAscending: boolean
  type?: string
}
