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
