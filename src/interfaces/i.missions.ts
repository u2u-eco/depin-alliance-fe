export interface IMissionItem {
  isChecked: boolean
  name: string
  point: number
  time: number
}

export interface IItemMissionPartner {
  description: string
  id: number
  image: string
  name: string
  point: number
  status: null | string
  type: string
  url: string
  xp: number
}
export interface IMissionPartner {
  description: string
  image: null | string
  missions: IItemMissionPartner[]
  name: string
  participants: number
  rewards: string
}
