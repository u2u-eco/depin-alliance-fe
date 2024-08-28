export interface IDeviceTypeItem {
  name: string
  code: string
  type: string
  miningPower: number
  price: number
  image: string | null
}

export interface IDeviceItemAddParam {
  code: string
  isBuy: boolean
  number: number
  index: number
}
