export const WORLD_MAP_ITEM = {
  AGENCY: 'AGENCY',
  TOOL: 'TOOL',
  CONTINENT: 'CONTINENT'
}

export interface IWorldMapItem {
  code: string
  description: string
  image: string | null
  name: string
  type: string
}

export interface IUpdateWorldMap {
  agency: string
  tool: string
  continent: string | null
}

export interface IWorldMapResult {
  createdAt: null | number
  id: number
  isCompleted: boolean
  location: string
  locationName: string
  type: string
  updatedAt: null | number
}

export interface IWorldMap {
  agency: IWorldMapItem
  continent: IWorldMapItem
  date: number
  isCompleted: boolean
  numberMissionCompleted: number
  results: Array<IWorldMapResult>
  time: number
  tool: IWorldMapItem
}
