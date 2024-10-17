import { IWorldMap, IWorldMapItem } from '@/interfaces/i.world-map'
import { createContext, useState } from 'react'
import {
  IconMapAfrica,
  IconMapAmerica,
  IconMapAntarctica,
  IconMapAsia,
  IconMapEurope,
  IconMapOceania
} from '@/app/components/icons'
import { keyBy } from 'lodash'
type WorldMapContextType = {
  continent: string | null
  setContinent: (type: string) => void
  listWorldMap: Array<IWorldMapItem>
  setListWorldMap: (data: Array<IWorldMapItem>) => void
}

export const MAP_CONTINENT_IMAGE: any = {
  continent_6: IconMapEurope,
  continent_1: IconMapAsia,
  continent_5: IconMapAfrica,
  continent_2: IconMapOceania,
  continent_4: IconMapAntarctica,
  continent_3: IconMapAmerica
}

export const WorldMapContext = createContext<WorldMapContextType | any>({})

const WorldMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [continent, setContinent] = useState<string>('')
  const [listWorldMap, setListWorldMap] = useState<Array<IWorldMapItem>>([])
  const [currentMap, setCurrentMap] = useState<IWorldMap | null>()
  const listWorldMapByContinent = keyBy(listWorldMap, 'code')
  return (
    <WorldMapContext.Provider
      value={{
        continent,
        setContinent,
        setListWorldMap,
        setCurrentMap,
        listWorldMap,
        listWorldMapByContinent,
        currentMap
      }}
    >
      {children}
    </WorldMapContext.Provider>
  )
}

export default WorldMapProvider
