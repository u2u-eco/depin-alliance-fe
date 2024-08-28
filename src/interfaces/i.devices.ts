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
  number: number
  index: number
}
