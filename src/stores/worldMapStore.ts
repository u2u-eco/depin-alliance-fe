import { create } from 'zustand'
import { IWorldMap, IWorldMapReward } from '@/interfaces/i.world-map'
interface IWorldMapStore {
  currentWorldMap: IWorldMap | null
  worldMapReward: IWorldMapReward | null
  setWorldMapReward: (item: IWorldMapReward | null) => void
  setCurrentWorldMap: (item: IWorldMap | null) => void
}

const useWorldMapStore = create<IWorldMapStore>((set) => ({
  currentWorldMap: null,
  worldMapReward: null,
  setWorldMapReward: (item) => set({ worldMapReward: item }),
  setCurrentWorldMap: (item) => set({ currentWorldMap: item })
}))

export default useWorldMapStore
